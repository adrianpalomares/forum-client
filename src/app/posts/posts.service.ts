import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Like, Post } from '../core/types';
@Injectable()
export class PostService {
    // Url
    apiUrl: string = `${environment.baseUrl}`;

    constructor(private httpClient: HttpClient) {}

    public getPosts(): Observable<Post[]> {
        return this.httpClient.get<Post[]>(`${this.apiUrl}/api/posts/`);
    }

    public getPostById(id: string): Observable<Post> {
        return this.httpClient.get<Post>(`${this.apiUrl}/api/posts/${id}`);
    }

    public createPost(post: Post): Observable<Post> {
        return this.httpClient.post<Post>(`${this.apiUrl}/api/posts/`, post);
    }

    /**
     *
     * @param id The post's id.
     * @returns An observable with an array of Like objects
     */
    public getLikesFromPostById(id: number): Observable<Like[]> {
        return this.httpClient.get<Like[]>(
            `${this.apiUrl}/api/posts/${id}/likes/`
        );
    }

    /**
     *
     * @param userId The user's id.
     * @returns An observable containing a list of posts belonging to the user.
     */
    public getPostsByUserId(userId: string): Observable<Post[]> {
        return this.httpClient.get<Post[]>(
            `${this.apiUrl}/api/users/${userId}/posts/`
        );
    }
}
