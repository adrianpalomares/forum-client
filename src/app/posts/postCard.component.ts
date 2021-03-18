import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../comments/comments.service';
import { Comment } from '../comments/comment.model';
import { Like, Post } from '../core/types';
import { PostService } from './posts.service';

@Component({
    selector: 'app-postcard',
    templateUrl: './postCard.component.html',
})
export class PostCardComponent implements OnInit {
    @Input() post: Post;
    comments: Comment[];
    likes: Like[];

    constructor(
        private commentService: CommentService,
        private postService: PostService
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
}
