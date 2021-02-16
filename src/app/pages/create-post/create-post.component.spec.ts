import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { title } from 'process';
import { AppModule } from 'src/app/app.module';

import { CreatePostComponent } from './create-post.component';

fdescribe('CreatePostComponent', () => {
    let component: CreatePostComponent;
    let fixture: ComponentFixture<CreatePostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreatePostComponent],
            imports: [AppModule],
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
    it('should call handlePostClick() when button is clicked', () => {
        // spy on handlePostClick()
        spyOn(component, 'handlePostClick');

        // grab button
        const postBtn = fixture.debugElement.query(By.css('button#post-button'))
            .nativeElement;

        // click
        postBtn.click();
        fixture.detectChanges();

        // check that it was called
        expect(component.handlePostClick).toHaveBeenCalled();
    });
    it('should have form group sync up with input', () => {
        // grab input elements
        const titleIn = fixture.debugElement.query(By.css('input#title-input'));
        const textIn = fixture.debugElement.query(
            By.css('textarea#text-input')
        );

        // change the values
        titleIn.nativeElement.value = 'This is my first post';
        textIn.nativeElement.value = 'This is the text of my first post.';

        // dispatch events so angular knows to update
        titleIn.nativeElement.dispatchEvent(new Event('input'));
        textIn.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        // test that the formgroup was updated
        expect(component.form.value.title).toEqual('This is my first post');
        expect(component.form.value.text).toEqual(
            'This is the text of my first post.'
        );
    });
});
