import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { PostService } from './posts/posts.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [PostService],
})
export class AppComponent implements OnInit {
    title = 'angular-app';
    loggedIn: boolean;

    constructor(private authService: AuthService, private router: Router) {}
    ngOnInit(): void {
        //   this.loggedIn = this.authService.isLoggedIn();
        //   console.log(this.loggedIn)
        this.router.events.subscribe((event) => {
            if (event.constructor.name == 'NavigationEnd') {
                this.loggedIn = this.authService.isLoggedIn();
            }
        });
    }
}
