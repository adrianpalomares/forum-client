import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/comments/comments.service';
import { Post } from 'src/app/posts/post.model';
import { Comment } from 'src/app/comments/comment.model';
import { PostService } from 'src/app/posts/posts.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
    post: Post;
    comments: Comment[];
    commentArea: string = '';

    constructor(
        private route: ActivatedRoute,
        private postService: PostService,
        private commentService: CommentService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        console.log(this.route.snapshot.params);
        // Grab the post
        this.postService
            .getPostById(this.route.snapshot.params.id)
            .subscribe((res) => {
                console.log(res);
                this.post = res;
                // Then grab the comments
                this.commentService.getCommentsByPost(this.post).subscribe(
                    (comments) => {
                        this.comments = comments;
                        console.log(this.comments.length);
                    },
                    (err) => console.log(err)
                );
            });
    }

    onCommentSubmit(e): void {
        if (e.ctrlKey && e.keyCode === 13) {
            console.log('match');
            // Send comment request to api
            const comment: Comment = {
                // TODO: Need to make this a comment type
                // TODO: userid is hardcoded
                userId: JSON.parse(this.authService.getUserId()), // Can probably get this from the jwt
                postId: this.post.id,
                content: this.commentArea,
            };
            this.commentService.createComment(comment).subscribe(
                (res) => {
                    this.comments.push(res);
                    this.commentArea = '';
                },
                (err) => {
                    console.log('erorr', err);
                }
            );
        }
    }
}
