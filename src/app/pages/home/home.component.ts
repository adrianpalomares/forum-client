import { Component, OnInit } from '@angular/core';
import { Post } from '../../core/types';
import { PostService } from '../../posts/posts.service';
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
        this.postService.getPosts().subscribe((res) => (this.posts = res));
        // }
    }
}
