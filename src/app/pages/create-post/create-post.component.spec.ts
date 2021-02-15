import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CreatePostComponent } from './create-post.component';

fdescribe('CreatePostComponent', () => {
    let component: CreatePostComponent;
    let fixture: ComponentFixture<CreatePostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreatePostComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreatePostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should have input field for title', () => {
        const titleIn = fixture.debugElement.query(By.css('input#title-input'))
            .nativeElement;
        expect(titleIn.placeholder).toEqual('Title');
    });
    it('should have a textarea for text(post content)', () => {
        const textIn = fixture.debugElement.query(By.css('textarea#text-input'))
            .nativeElement;
        expect(textIn.placeholder).toEqual('Text (Optional)');
    });
    it('should have a button to post', () => {
        const postBtn = fixture.debugElement.query(By.css('button#post-button'))
            .nativeElement;
        expect(postBtn.innerText).toEqual('Post');
    });
});
