import { Component, OnInit } from '@angular/core';
import { PostService } from '../../core/services/posts.service';
import { Post } from '../../core/types';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    posts: Post[];
    constructor(private postService: PostService) {}

    ngOnInit(): void {
        // if (localStorage.getItem('token') != null) { // temp change because of tests
        this.postService
            .getPosts()
            .subscribe((response) => (this.posts = response.content));
        // }
    }
}
