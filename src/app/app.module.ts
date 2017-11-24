import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import {HeaderLayoutComponent} from './shared/layout/header/header.component';
import {FooterLayoutComponent} from './shared/layout/footer/footer.component';
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


const appRoutes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent
  }, {
    /**
    * General feed.
    */
    path: 'home',
    component: HomeComponent
  }, {
    path: 'profile/:identifier',
    component: ProfileComponent
  }, {
    path: 'tag/:tag',
    component: TagComponent
  }, {
    path: 'post/:post',
    component: PostComponent
  }, {
    path: 'discover',
    component: DiscoverComponent,
    data: { title: 'Discoveeeer' }
  }, {
    path: 'friends',
    component: FriendsComponent,
}, {
  path: '',
  component: HomeComponent
  //redirectTo: '/home'
}, {
  path: '**',
    component: PageNotFoundComponent
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
    MenuComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }   // <-- debugging purposes only
    ),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
