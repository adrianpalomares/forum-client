import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
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
