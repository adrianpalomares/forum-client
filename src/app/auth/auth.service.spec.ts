// describe('AuthSerivce', () => {
//     let authService: AuthService;
//     let httpClientSpy: { post: jasmine.Spy };

//     beforeEach(() => {
//         httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
//         authService = new AuthService(<any> httpClientSpy);

//     })

//     it("Should set response to local storage.", () => {
//         const res = {token: "thisistoken"};

//         httpClientSpy.post.and.returnValue(asyncD)
//     })
// });
import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService],
        });
    });

    it('should get token on response', inject(
        [HttpTestingController, AuthService],
        (httpMock: HttpTestingController, authService: AuthService) => {
            const mockResponse = { token: 'thisistoken' };
            authService
                .login('sample', 'password')
                .subscribe((event: HttpEvent<any>) => {
                    console.log('from here', Object.keys(event));
                    // Below doesn't work because response is just the json nothing else
                    // switch (event.type) {
                    //     case HttpEventType.Response:
                    //         expect(event.body).toEqual(mockResponse);
                    // }
                    expect(event['token']).toEqual(mockResponse.token);
                });

            const mockRequest = httpMock.expectOne(
                `${authService.apiUrl}/login`
            );

            mockRequest.flush(mockResponse);
            httpMock.verify();
        }
    ));

    it('should check if user is logged in', inject(
        [HttpTestingController, AuthService],
        (httpMock: HttpTestingController, authService: AuthService) => {
            localStorage.setItem('token', 'atoken'); // if token present then user is logged in
            const result = authService.isLoggedIn();
            expect(result).toBeTrue();
        }
    ));

    it('should log user out', inject(
        [HttpTestingController, AuthService],
        (httpMock: HttpTestingController, authService: AuthService) => {
            // setting token
            localStorage.setItem('token', 'atoken');
            authService.logout(); // if token present then user is logged in
            const result = authService.isLoggedIn();
            expect(result).toBeFalse();
            expect(localStorage.getItem('token')).toBeNull();
        }
    ));
});
