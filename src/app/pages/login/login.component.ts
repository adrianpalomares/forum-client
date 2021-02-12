import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            email: [
                '',
                [
                    Validators.required,
                    Validators.pattern(
                        '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
                    ),
                ],
            ],
            password: ['', Validators.required],
        });
    }

    onSubmit(): void {
        const email = this.form.get('email').value;
        const password = this.form.get('password').value;
        // Log in with authService
        // If success set token to localstorage
        this.authService.login(email, password).subscribe(
            (response) => {
                console.log(response);
                localStorage.setItem('token', JSON.stringify(response.token));
                localStorage.setItem(
                    'username',
                    JSON.stringify(response.username)
                );
                localStorage.setItem('userId', JSON.stringify(response.userId));
                this.router.navigate(['/']);
            },
            // If error
            (response) => {
                console.log('Login error', response);
            }
        );
    }
}
