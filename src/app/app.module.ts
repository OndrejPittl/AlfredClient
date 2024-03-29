// core
import { BrowserModule } from '@angular/platform-browser';
import {  NgModule} from '@angular/core';
import { HttpModule } from '@angular/http';
import {FormsModule} from "@angular/forms";

// config
import {appRoutes, routing, routingProviders} from './app.routing';

// components
import { AppComponent } from './app.component';
import { HeaderLayoutComponent } from './shared/layout/header/header.component';
import { FooterLayoutComponent } from './shared/layout/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { FriendsComponent } from './components/friends/friends.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TagComponent } from './components/tag/tag.component';
import { PostItemComponent } from './shared/layout/post-feed/post-item.component';
import { PostComponent } from './components/post/post.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MenuComponent } from './shared/layout/menu/menu.component';
import { FilterFormComponent } from './shared/forms/filter-form/filter-form.component';
import { RatedComponent } from './components/rated/rated.component';
import { PostFeedComponent } from './shared/layout/post-feed/post-feed.component';
import { SignUpFormComponent } from './shared/forms/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './shared/forms/sign-in-form/sign-in-form.component';
import { CommentFormComponent} from "./shared/forms/comment-form/comment-form.component";
import { PostCommentsComponent } from './shared/layout/post-comments/post-comments.component';
import {MasonryModule} from "angular2-masonry";
import {PostFormComponent} from "./shared/forms/post-form/post-form.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { LightboxModule } from 'angular2-lightbox';



// services
import { PostService } from "./services/post.service";
import { UserService } from "./services/user.service";
import { EqualityValidatorDirective } from './directives/equality-validator.directive';
import {AuthGuard} from "./guards/auth.guard";
import {AuthService} from "./services/auth.service";
import {ImgComponent} from "./shared/layout/img/img.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CustomHttpInterceptor} from "./services/http-interceptor";
import {CommentService} from "./services/comment.service";
import {RatingService} from "./services/rating.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderLayoutComponent,
    FooterLayoutComponent,
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
    PostFormComponent,
    EqualityValidatorDirective,
    ImgComponent,
    PostCommentsComponent,
    CommentFormComponent
  ],
  imports: [
    MasonryModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    routing,
    InfiniteScrollModule,
    LightboxModule
  ],
  providers: [
    PostService,
    UserService,
    AuthService,
    routingProviders,
    AuthGuard,
    CommentService,
    RatingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
