import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/posts/posts.service';
import { PostComponent } from './post.component';


describe('PostComponent', () => {
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
});
