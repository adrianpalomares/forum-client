import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommentService } from '../core/services/comments.service';
import { AuthService } from '../core/services/auth.service';
import { PostsModule } from '../posts/posts.module';
import { CreatePostComponent } from './create-post/create-post.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
    declarations: [
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        LogoutComponent,
        PostComponent,
        CreatePostComponent,
        NotFoundPageComponent,
        ProfileComponent,
    ],
    imports: [
        CommonModule,
        PostsModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        RouterModule,
        MatTabsModule,
        MatCardModule,
    ],
    providers: [AuthService, CommentService],
})
export class PagesModule {}
