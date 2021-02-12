/**
 * Responsible for adding the token to the request
 * */

import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // the object that goes into clone()
        // if the user is logged in then send the token in header
        // there was issues with sending Bearer string with no token
        const update = this.authService.isLoggedIn()
            ? {
                  setHeaders: {
                      Authorization: `Bearer ${JSON.parse(
                          this.authService.getToken()
                      )}`,
                  },
              }
            : {};
        const request = req.clone(update);
        console.log(request);
        return next.handle(request);
    }
}
