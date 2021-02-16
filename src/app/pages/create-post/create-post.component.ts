import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
    // Responsible for holding text and title input values
    form: FormGroup;
    constructor() {}

    ngOnInit(): void {
        this.form = new FormGroup({
            title: new FormControl(''),
            text: new FormControl(''),
        });
    }

    handlePostClick() {}
}
