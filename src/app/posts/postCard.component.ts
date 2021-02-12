import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../comments/comments.service';
import { Post } from './post.model';
import { Comment } from '../comments/comment.model';

@Component({
    selector: 'app-postcard',
    templateUrl: './postCard.component.html',
})
export class PostCardComponent implements OnInit {
    @Input() post: Post;
    comments: Comment[];
    constructor(private commentService: CommentService) {}
    ngOnInit(): void {
        this.commentService
            .getCommentsByPost(this.post)
            .subscribe((res) => (this.comments = res));
    }
}
