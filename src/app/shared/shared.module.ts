import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderLayoutComponent } from './layout/header/header.component';
import { FooterLayoutComponent } from './layout/footer/footer.component';
import { FilterFormComponent } from './forms/filter-form/filter-form.component';
import { PostFeedComponent } from './layout/post-feed/post-feed.component';
import {SignUpFormComponent} from './forms/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './forms/sign-in-form/sign-in-form.component';
import { PostFormComponent } from './forms/post-form/post-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderLayoutComponent,
    FooterLayoutComponent,
    FilterFormComponent,
    PostFeedComponent,
    SignUpFormComponent,
    SignInFormComponent,
    PostFormComponent
  ]
})
export class SharedModule { }
