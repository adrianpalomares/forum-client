import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Comment } from 'src/app/comments/comment.model';
import { CommentService } from 'src/app/comments/comments.service';
import { Post } from 'src/app/posts/post.model';
import { PostService } from 'src/app/posts/posts.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
    post: Post;
    comments: Comment[];
    commentArea: string;

    constructor(
        private route: ActivatedRoute,
        private postService: PostService,
        private commentService: CommentService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        // Comment area should be empty by default
        this.commentArea = '';
        // Grab the post
        this.postService
            .getPostById(this.route.snapshot.params.id)
            .subscribe((response) => {
                this.post = response;
                // Then grab the comments
                this.commentService.getCommentsByPost(this.post).subscribe(
                    (comments) => {
                        this.comments = comments;
                    },
                    (err) => console.log(err)
                );
            });
    }

    onCommentSubmit(keyboardEvent: KeyboardEvent): void {
        console.log(keyboardEvent);
        // Adding Ctrl + Enter support
        if (keyboardEvent.ctrlKey && keyboardEvent.code === 'Enter') {
            // Send comment request to api
            const comment: Comment = {
                userId: JSON.parse(this.authService.getUserId()), // Can probably get this from the jwt
                postId: this.post.id,
                content: this.commentArea,
            };
            this.commentService.createComment(comment).subscribe(
                (response) => {
                    this.comments.push(response);
                    this.commentArea = '';
                },
                (error) => {
                    console.log('erorr', error);
                }
            );
        }
    }
}
