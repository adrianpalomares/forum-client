import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { PostService } from './posts/posts.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [PostService],
})
export class AppComponent implements OnInit {
    title = 'angular-app';
    loggedIn: boolean;
    helper = new JwtHelperService();
    constructor(private authService: AuthService, private router: Router) {}
    ngOnInit(): void {
        // Check if token is valid, if not delete(logout)
        const rawToken = this.authService.getToken();
        if (this.helper.isTokenExpired(rawToken)) {
            this.authService.logout();
        }
        // TODO: Might need to throw an emitter/event?
        // Scenario: when user starts app for first time after being logged in
        // if token invalid it erases but navbar does not update
        this.router.events.subscribe((event) => {
            if (event.constructor.name == 'NavigationEnd') {
                this.loggedIn = this.authService.isLoggedIn();
            }
        });
    }
}
