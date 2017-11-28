// core
import { BrowserModule } from '@angular/platform-browser';
import {  NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import {FormsModule} from "@angular/forms";

// config
import { APP_ROUTES } from './config/routes';

// components
import { AppComponent } from './app.component';
import { HeaderLayoutComponent } from './shared/layout/header/header.component';
import { FooterLayoutComponent } from './shared/layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { FriendsComponent } from './components/friends/friends.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TagComponent } from './components/tag/tag.component';
import { PostItemComponent } from './shared/post-feed/post-item.component';
import { PostComponent } from './components/post/post.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MenuComponent } from './shared/layout/menu/menu.component';
import { FilterFormComponent } from './shared/forms/filter-form/filter-form.component';
import { RatedComponent } from './components/rated/rated.component';
import { PostFeedComponent } from './shared/post-feed/post-feed.component';
import { UserFormComponent } from './shared/forms/user-form/user-form.component';
import { SignInFormComponent } from './shared/forms/sign-in-form/sign-in-form.component';

// services
import { PostService } from "./services/post.service";
import { UserService } from "./services/user.service";
import { EqualityValidatorDirective } from './directives/equality-validator.directive';





@NgModule({
  declarations: [
    AppComponent,
    HeaderLayoutComponent,
    FooterLayoutComponent,
    HomeComponent,
    ProfileComponent,
    DiscoverComponent,
    FriendsComponent,
    PageNotFoundComponent,
    TagComponent,
    PostItemComponent,
    PostComponent,
    WelcomeComponent,
    MenuComponent,
    FilterFormComponent,
    RatedComponent,
    PostFeedComponent,
    UserFormComponent,
    SignInFormComponent,
    EqualityValidatorDirective,
  ],
  imports: [
    RouterModule.forRoot(
      APP_ROUTES,
      { enableTracing: false }
    ),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    PostService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
