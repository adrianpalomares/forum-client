import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from './post.model';
@Injectable()
export class PostService {
    // Url
    apiUrl: string = `${environment.baseUrl}/api/posts`;

    constructor(private httpClient: HttpClient) {}

    public getPosts() {
        return this.httpClient.get<Post[]>(`${this.apiUrl}/`);
    }

    public getPostById(id: string) {
        return this.httpClient.get<Post>(`${this.apiUrl}/${id}`);
    }

    public createPost(post: Post) {
        return this.httpClient.post(`${this.apiUrl}/`, post);
    }
}
