import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppModule } from 'src/app/app.module';
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
            imports: [
                HttpClientModule,
                ReactiveFormsModule,
                FormsModule,
                RouterModule,
                AppModule,
            ],
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

    it('Should check that username is not empty', () => {
        // Setting invalid email
        component.form.setValue({
            username: '', // not valid
            password: 'password',
        });
        fixture.detectChanges();
        let username = component.form.controls['username'];
        expect(username.valid).toBeFalse();

        console.log('gets to here');
        component.form.setValue({
            username: 'username123',
            password: 'password',
        });
        username = component.form.controls['username'];
        // console.log(email);
        fixture.detectChanges();
        expect(username.valid).toBeTrue();
    });
    it('Should have a password field', () => {
        const passwordElem = fixture.debugElement.query(
            By.css('input#passwordInput')
        );
        expect(passwordElem.nativeElement).not.toBeNull();
    });
    it('should call onSubmit() when sign in button is pressed', () => {
        spyOn(component, 'onSubmit');
        const signinBtn = fixture.debugElement.query(
            By.css('button#signin-button')
        );
        signinBtn.nativeElement.click();
        fixture.detectChanges();
        expect(component.onSubmit).toHaveBeenCalled();
    });
    it('should be invalid if empty password', () => {
        console.log(component.form.controls['password'].valid);
        expect(component.form.controls['password'].valid).toBeFalse();
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
