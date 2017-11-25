import { BrowserModule } from '@angular/platform-browser';
import {  NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderLayoutComponent } from './shared/layout/header/header.component';
import { FooterLayoutComponent } from './shared/layout/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { DiscoverComponent } from './discover/discover.component';
import { FriendsComponent } from './friends/friends.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TagComponent } from './tag/tag.component';
import { PostItemComponent } from './shared/post-item/post-item.component';
import { PostComponent } from './post/post.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MenuComponent } from './shared/layout/menu/menu.component';
import { FilterFormComponent } from './shared/forms/filter-form/filter-form.component';
import { RatedComponent } from './rated/rated.component';
import { TestService } from "./test.service";


const appRoutes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    data: { identifier: 'welcome' }
  }, {
    path: 'home',
    component: HomeComponent,
    data: { identifier: 'home' }
  }, {
    path: 'profile/:identifier',
    component: ProfileComponent,
    data: { identifier: 'profile' }
  }, {
    path: 'tag/:tag',
    component: TagComponent,
    data: { identifier: 'tag' }
  }, {
    path: 'post/:post',
    component: PostComponent,
    data: { identifier: 'post' }
  }, {
    path: 'discover',
    component: DiscoverComponent,
    data: { identifier: 'discover' }
  }, {
    path: 'rated',
    component: RatedComponent,
    data: { identifier: 'rated' }
  }, {
    path: 'friends',
    component: FriendsComponent,
    data: { identifier: 'friends' }
}, {
    path: '',
    component: HomeComponent
    //redirectTo: '/home'
}, {
    path: '**',
    component: PageNotFoundComponent,
    data: { identifier: 'error' }
}];


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
    RatedComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }   // <-- debugging purposes only
    ),
    BrowserModule,
    HttpModule
  ],
  providers: [
    TestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
