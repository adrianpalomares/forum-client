import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/posts/posts.service';
import { PostComponent } from './post.component';

fdescribe('PostComponent', () => {
    let component: PostComponent;
    let fixture: ComponentFixture<PostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PostComponent],
            imports: [AppModule],
            providers: [AuthService, PostService],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    // TODO: Fails because user is not logged in so comment area won't show
    it('Should call postComment when post button is pressed.', () => {
        const postBtn = fixture.debugElement.query(By.css('#post-button'));
        // Spy
        spyOn(component, 'postComment');
        // Simulate click
        postBtn.nativeElement.click();
        // Test
        expect(component.postComment).toHaveBeenCalled();
    });
});
