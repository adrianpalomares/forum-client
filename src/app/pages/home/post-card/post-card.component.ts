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
            });
    }

    handleLikeClick(): void {
        console.log('like click');
        const userId = parseInt(this.authService.getUserId());
        // Register the like
        this.postService
            .addLikeToPost(this.post.id, userId, true)
            .subscribe((response) => {
                // Update the count
                this.likes.push(response);
            });
    }

    handleDislikeClick(): void {
        console.log('dislike click');
    }
}
