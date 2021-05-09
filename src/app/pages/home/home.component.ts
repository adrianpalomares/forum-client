import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PostService } from '../../core/services/posts.service';
import { Post } from '../../core/types';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    posts: Post[];
    // Paginator
    length: number;
    pageSize: number;
    // pageSizeOptions: number[] = [5, 10, 25, 100];

    constructor(private postService: PostService) {}

    ngOnInit(): void {
        // For now a page size of 10 is supported
        this.pageSize = 10;
        this.postService.getPosts().subscribe((response) => {
            this.posts = response.content;
            this.length = response.totalElements; // Setting totatl pages
        });
    }

    handlePageEvent(pageEvent: PageEvent): void {
        console.log(pageEvent);
        // Grab page index from pageEvent
        const pageIndex = pageEvent.pageIndex;
        // Fetch new page of posts
        this.postService.getPosts(pageIndex).subscribe((response) => {
            this.posts = response.content;
            console.log(response.content);
        });
    }
}
