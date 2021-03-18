import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from './post.model';
import { Like } from '../core/types';
@Injectable()
export class PostService {
    // Url
    apiUrl: string = `${environment.baseUrl}/api/posts`;

    constructor(private httpClient: HttpClient) {}

    public getPosts(): Observable<Post[]> {
        return this.httpClient.get<Post[]>(`${this.apiUrl}/`);
    }

    public getPostById(id: string): Observable<Post> {
        return this.httpClient.get<Post>(`${this.apiUrl}/${id}`);
    }

    public createPost(post: Post): Observable<Post> {
        return this.httpClient.post<Post>(`${this.apiUrl}/`, post);
    }

    /**
     *
     * @param id The post's id.
     * @returns An observable with an array of Like objects
     */
    public getLikesFromPostById(id: number): Observable<Like[]> {
        return this.httpClient.get<Like[]>(`${this.apiUrl}/${id}/likes/`);
    }
}
