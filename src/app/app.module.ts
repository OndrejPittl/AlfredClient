import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import {HeaderLayoutComponent} from './shared/layout/header.component';
import {FooterLayoutComponent} from './shared/layout/footer.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { DiscoverComponent } from './discover/discover.component';
import { FriendsComponent } from './friends/friends.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostComponent } from './shared/post/post.component';


const appRoutes: Routes = [{
    path: 'home',
    component: HomeComponent
  }, {
    path: 'profile/:identifier',
    component: ProfileComponent
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
    PostComponent
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
