import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
    apiUrl: string = `${environment.baseUrl}/api/auth`;

    constructor(private httpClient: HttpClient) {}

    login(username: String, password: String) {
        return this.httpClient.post<any>(`${this.apiUrl}/login`, {
            username: username,
            password: password,
        });
    }

    isLoggedIn() {
        const token = localStorage.getItem('token');
        console.log("from isLoggedIn",token != null)
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
            { observe: 'response' }
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
