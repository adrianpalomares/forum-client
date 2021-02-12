import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    let mockedAuthSerivice;

    beforeEach(async () => {
        mockedAuthSerivice = jasmine.createSpyObj(['login']);
        mockedAuthSerivice.login.and.returnValue({ token: 'thisisatoken' });

        await TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [HttpClientModule, ReactiveFormsModule, FormsModule],
            providers: [{ provide: AuthService, useClass: AuthServiceStub }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('empty form should be invalid', () => {
        expect(component.form.valid).toBeFalsy();
    });

    it('Should check for proper email format', () => {
        // Setting invalid email
        component.form.setValue({
            email: 'improperemail.com', // not valid
            password: 'password',
        });
        let email = component.form.controls['email'];
        expect(email.valid).toBeFalse();

        component.form.setValue({
            email: 'email@email.com',
            password: 'password',
        });
        expect(email.valid).toBeTrue();
    });

    // it('Should set token to local storage', () => {
    //     component.onSubmit();
    //     expect(localStorage.getItem('token')).not.toBeNull();
    // });
});

// used for mocking auth service
class AuthServiceStub {
    login(username: string, password: string) {
        return { token: 'thisis token' };
    }
}
