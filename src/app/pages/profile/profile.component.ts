import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentService } from 'src/app/core/services/comments.service';
import { PostService } from 'src/app/core/services/posts.service';
import { Comment, Post } from 'src/app/core/types';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    posts: Post[];
    comments: Comment[];

    constructor(
        private postService: PostService,
        private commentService: CommentService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        const userId = this.authService.getUserId();
        // Grab posts
        this.postService.getPostsByUserId(userId).subscribe((response) => {
            this.posts = response;
            console.log(this.posts);
        });

        // Grab comments
    }
}
