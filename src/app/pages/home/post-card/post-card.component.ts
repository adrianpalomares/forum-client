import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentService } from 'src/app/core/services/comments.service';
import { PostService } from 'src/app/core/services/posts.service';
import { Like, Post, Comment } from 'src/app/core/types';

@Component({
    selector: 'app-post-card',
    templateUrl: './post-card.component.html',
    styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
    @Input() post: Post;
    comments: Comment[];
    likes: Like[];
    likeCount: number;

    constructor(
        private commentService: CommentService,
        private postService: PostService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.commentService
            .getCommentsByPost(this.post)
            .subscribe((res) => (this.comments = res));

        // Grabbing list of likes from post
        this.postService
            .getLikesFromPostById(this.post.id)
            .subscribe((response) => {
                this.likes = response;
                // Getting the total value of likes, will be negative if there are more dislikes
                this.updateLikeCount();
            });
    }

    /**
     * Method to update like count
     */
    updateLikeCount(): void {
        this.likeCount =
            this.likes.filter((like) => like.value === true).length -
            this.likes.filter((like) => like.value === false).length;
    }

    /**
     * Handles the like button click
     * @param value Whether the Like is a like(true) or dislike(false)
     */
    handleLikeAction(value: boolean): void {
        const userId = parseInt(this.authService.getUserId());
        // Find if the user has a like object already
        const likesFilteredByUserId = this.likes.filter(
            (like) => like.userId === parseInt(this.authService.getUserId())
        );
        // If a user does not have a like
        if (likesFilteredByUserId.length === 0) {
            // Register the like
            this.postService
                .addLikeToPost(this.post.id, userId, value)
                .subscribe((response) => {
                    this.likes.push(response);
                });
        } else if (likesFilteredByUserId[0].value !== value) {
            // If the like that the user has is opposite to the one they want to submit. eg. They liked a post but want to dislike it.
            const likeId = likesFilteredByUserId[0].id;
            // Make the request then when request is completed we replace old like with new
            this.postService
                .addLikeToPost(this.post.id, userId, value, likeId)
                .subscribe((response) => {
                    this.likes[0] = response; // Prevents duplicate likes
                    this.updateLikeCount();
                });
        }
    }
}
