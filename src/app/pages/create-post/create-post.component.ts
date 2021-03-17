import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/posts/posts.service';
import { Post } from '../../posts/post.model';

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
    // Responsible for holding text and title input values
    form: FormGroup;
    isLoading: boolean;
    constructor(
        private postService: PostService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            title: new FormControl(''),
            text: new FormControl(''),
        });
        this.isLoading = false;
    }

    handlePostClick(): void {
        // Check if user is logged in
        if (!this.authService.isLoggedIn()) {
            alert('You need to be logged in to post.');
            return;
        }
        this.isLoading = true;
        const post: Post = {
            title: this.form.value.title,
            text: this.form.value.text,
            userId: this.authService.getUserId(),
        };

        // Send to api
        this.postService.createPost(post).subscribe((res) => {
            console.log(res);
            // Redirect to home page
            this.router.navigate(['']);
        });
    }
}
