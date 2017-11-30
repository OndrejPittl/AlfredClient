// core
import { BrowserModule } from '@angular/platform-browser';
import {  NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import {FormsModule} from "@angular/forms";

// config
import {appRoutes, routing, routingProviders} from './app.routing';

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
import { SignUpFormComponent } from './shared/forms/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './shared/forms/sign-in-form/sign-in-form.component';

// services
import { PostService } from "./services/post.service";
import { UserService } from "./services/user.service";
import { EqualityValidatorDirective } from './directives/equality-validator.directive';
import {AuthGuard} from "./guards/auth.guard";
import {AuthService} from "./services/auth.service";





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
    SignUpFormComponent,
    SignInFormComponent,
    EqualityValidatorDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    PostService,
    UserService,
    AuthService,
    routingProviders,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
