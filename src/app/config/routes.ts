import {Routes} from "@angular/router";

import {WelcomeComponent} from "../components/welcome/welcome.component";
import {HomeComponent} from "../components/home/home.component";
import {ProfileComponent} from "../components/profile/profile.component";
import {TagComponent} from "../tag/tag.component";
import {PostComponent} from "../components/post/post.component";
import {DiscoverComponent} from "../components/discover/discover.component";
import {RatedComponent} from "../components/rated/rated.component";
import {FriendsComponent} from "../components/friends/friends.component";
import {PageNotFoundComponent} from "../components/page-not-found/page-not-found.component";



/*

  Tipy:
    – počet starred/rated?
    –

 */


export const APP_ROUTES: Routes = [
  {
    /**
     * Welcome page.
     * For incoming unregistered visitors.
     */
    path: 'welcome',
    component: WelcomeComponent,
    data: { identifier: 'welcome' }
  }, {
    /**
     *  General post feed.
     *  Feed of latest posts with a possibility of filtering.
     */
    path: 'discover',
    component: DiscoverComponent,
    data: { identifier: 'discover' }
  }, {
    /**
     *  Rated post feed.
     *  Feed of rated post of the logged in user.
     */
    path: 'rated',
    component: RatedComponent,
    data: { identifier: 'rated' }
  }, {
    /**
     * Friend post feed.
     * Feed of logged in user's friend's posts.
     */
    path: 'friends',
    component: FriendsComponent,
    data: { identifier: 'friends' }
  }, {
    path: 'home',
    component: HomeComponent,
    data: { identifier: 'home' }
  }, {
    /**
     * Profile page.
     * Contains information about a person.
     */
    path: 'user/:slug',
    component: ProfileComponent,
    data: { identifier: 'profile' }
  }, {
    /**
     *  Tag post feed.
     *  Contains posts with the specified tag.
     */
    path: 'tag/:tag',
    component: TagComponent,
    data: { identifier: 'tag' }
  }, {
    /**
     * Post page.
     * Contains full info of the specified post.
     */
    path: 'post/:id',
    component: PostComponent,
    data: { identifier: 'post' }
  }, {
    /**
     * No suffix –> redirect to /discover.
     */
    path: '',
    pathMatch: 'full',
    redirectTo: '/discover'
  }, {
    /**
     * Default: Error page.
     */
    path: '**',
    component: PageNotFoundComponent,
    data: { identifier: 'error' }
  }
];
