import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            email: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        });
    }

    onSubmit(): void {
        // TODO: Can probably incorporate more of Validator logic
        if (this.form.invalid) {
            console.log('from invalid', this.form);
            return;
        }

        // Check if passwords match
        if (
            this.form.get('password').value ==
            this.form.get('confirmPassword').value
        ) {
            // Send request
            //TODO: At the moment, it accepts adding the same user (existing email/user)
            this.authService
                .register(
                    this.form.get('username').value,
                    this.form.get('password').value,
                    this.form.get('email').value
                )
                .subscribe(
                    (response) => {
                        console.log(response);
                        this.router.navigate(['login']);
                    },
                    // Handle error
                    (response) => {
                        console.log('error');
                    }
                );
            console.log('success');
        } else {
            alert('mismatching passwords');
        }

        // If successful redirect to login page

        // else highlight area that is wrong eg. Mismatching passwords
    }
}
