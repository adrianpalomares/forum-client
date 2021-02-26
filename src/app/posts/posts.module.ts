import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './postCard.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
@NgModule({
    declarations: [PostCardComponent],
    imports: [CommonModule, MatCardModule, RouterModule],
    exports: [PostCardComponent],
})
export class PostsModule {}
