import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, Comment } from '../types';
import { environment } from 'src/environments/environment';

@Injectable()
export class CommentService {
    apiUrl: string = `${environment.baseUrl}/api/comments/`;

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
