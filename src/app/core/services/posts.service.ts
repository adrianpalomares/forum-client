import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Like, PagedPostResponse, Post } from '../types';
@Injectable()
export class PostService {
    // Url
    apiUrl: string = `${environment.baseUrl}`;

    constructor(private httpClient: HttpClient) {}

    public getPosts(pageIndex: number = 0): Observable<any> {
        return this.httpClient.get<any>(
            `${this.apiUrl}/api/posts/?page=${pageIndex}`
        );
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
     * Method to add a like to a post.
     * @param postId The Id of the post. This is used to make the request to the appropriate endpoint.
     * @param userId This is the user's id.
     * @param value Whether it is a like(true) or dislike(false)
     * @param likeId The like's id. This is useful if we are updating the like. Although, the api will
     * check if the user has already submitted a like.
     * @returns An observable with the result of the request. Includes the like object created server side.
     */
    public addLikeToPost(
        postId: number,
        userId: number,
        value: boolean,
        likeId: number = null
    ): Observable<any> {
        // Create the like object
        function createLikeObject(): Like {
            if (likeId == null) {
                return { userId, value };
            } else {
                return { userId, value, id: likeId };
            }
        }

        const like = createLikeObject();
        return this.httpClient.post(
            `${this.apiUrl}/api/posts/${postId}/likes/`,
            like
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
