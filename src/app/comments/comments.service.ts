import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../posts/post.model';
import { Comment } from '../comments/comment.model';

@Injectable()
export class CommentService {
    apiUrl: string = 'api/comments';

    constructor(private httpClient: HttpClient) {}

    public getCommentsByPost(post: Post) {
        return this.httpClient.get<Comment[]>(
            `${this.apiUrl}?postId=${post.id}`
        );
    }

    public createComment(comment: Comment) {
        return this.httpClient.post<Comment>(`${this.apiUrl}`, comment);
    }
}
