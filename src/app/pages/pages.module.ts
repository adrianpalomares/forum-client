import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostsModule } from '../posts/posts.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { CommentService } from '../comments/comments.service';
import { LogoutComponent } from './logout/logout.component';
import { PostComponent } from './post/post.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatePostComponent } from './create-post/create-post.component';

@NgModule({
    declarations: [
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        LogoutComponent,
        PostComponent,
        CreatePostComponent,
    ],
    imports: [
        CommonModule,
        PostsModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
    ],
    providers: [AuthService, CommentService],
})
export class PagesModule {}
