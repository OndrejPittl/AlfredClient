import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderLayoutComponent } from './layout/header/header.component';
import { FooterLayoutComponent } from './layout/footer/footer.component';
import { FilterFormComponent } from './forms/filter-form/filter-form.component';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { UserFormComponent } from './forms/user-form/user-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderLayoutComponent,
    FooterLayoutComponent,
    FilterFormComponent,
    PostFeedComponent,
    UserFormComponent
  ]
})
export class SharedModule { }
