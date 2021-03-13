import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
    apiUrl: string = `${environment.baseUrl}/api/auth`;
    // Some logic is used in login component
    loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
    public logEmitter = this.loggedIn.asObservable();

    constructor(private httpClient: HttpClient) {
        // this.loggedIn = this.isLoggedIn();
    }
    // TODO: Document this
    // this function is used to emit the change that user is logged in or not
    logEmitChange(isLoggedIn: boolean){
        this.loggedIn.next(isLoggedIn);
    }

    login(username: String, password: String) {
        return this.httpClient.post<any>(
            `${this.apiUrl}/login/`,
            {
                username: username,
                password: password,
            },
            { observe: 'body' }
        );
    }

    isLoggedIn() {
        const token = localStorage.getItem('token');
        return token != null;
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
    }

    register(username: String, password: String, email: String) {
        return this.httpClient.post<any>(
            `${this.apiUrl}/register`,
            {
                username: username,
                password: password,
                email: email,
            },
            { observe: 'body' }
        );
    }

    getToken() {
        const token = localStorage.getItem('token');
        return token;
    }

    getUsername() {
        const username = localStorage.getItem('username');
        return username;
    }

    getUserId() {
        const userId = localStorage.getItem('userId');
        return userId;
    }
}
