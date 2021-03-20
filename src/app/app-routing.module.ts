import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    CreatePostComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    NotFoundPageComponent,
    PostComponent,
    RegisterComponent,
} from './pages';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'logoutroute', component: LogoutComponent },
    { path: 'post/:id', component: PostComponent },
    { path: 'create-post', component: CreatePostComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '404', component: NotFoundPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
