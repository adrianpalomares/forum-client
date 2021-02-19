import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';
import { PostsModule } from './posts/posts.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorService } from './auth/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
// import { MatFormField } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
    declarations: [AppComponent, NavComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        PagesModule,
        PostsModule,
        BrowserAnimationsModule,
        MatInputModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        JwtModule,
        // MatToolbarModule,
        // MatButtonModule,
        // MatSidenavModule,
        // MatIconModule,
        // MatListModule,
        // MatStepperModule,
        // MatInputModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
