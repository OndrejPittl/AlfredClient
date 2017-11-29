import {RouterModule, Routes} from "@angular/router";

import {WelcomeComponent} from "../components/welcome/welcome.component";
import {HomeComponent} from "../components/home/home.component";
import {ProfileComponent} from "../components/profile/profile.component";
import {TagComponent} from "../components/tag/tag.component";
import {PostComponent} from "../components/post/post.component";
import {DiscoverComponent} from "../components/discover/discover.component";
import {RatedComponent} from "../components/rated/rated.component";
import {FriendsComponent} from "../components/friends/friends.component";
import {PageNotFoundComponent} from "../components/page-not-found/page-not-found.component";
import {ModuleWithProviders} from "@angular/core";
import {AuthGuard} from "../guards/auth.guard";


export const appRoutes: Routes = [
  { path: 'welcome',      component: WelcomeComponent,      data: { identifier: 'welcome' } },
  { path: 'discover',     component: DiscoverComponent,     data: { identifier: 'discover' },     canActivate: [AuthGuard] },
  { path: 'rated',        component: RatedComponent,        data: { identifier: 'rated' } },
  { path: 'friends',      component: FriendsComponent,      data: { identifier: 'friends' } },
  { path: 'home',         component: HomeComponent,         data: { identifier: 'home' } },
  { path: 'profile/:slug',component: ProfileComponent,      data: { identifier: 'profile' } },
  { path: 'tag/:tag',     component: TagComponent,          data: { identifier: 'tag' } },
  { path: 'post/:id',     component: PostComponent,         data: { identifier: 'post' } },
  { path: '',             pathMatch: 'full',                redirectTo: '/discover' },
  { path: '**',           component: PageNotFoundComponent, data: { identifier: 'error' } }
];

export const routingProviders = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
//export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });







//
// export const APP_ROUTES: Routes = [
//   {
//     /**
//      * Welcome page.
//      * For incoming unregistered visitors.
//      */
//     path: 'welcome',
//     component: WelcomeComponent,
//     data: { identifier: 'welcome' }
//   }, {
//     /**
//      *  General post feed.
//      *  Feed of latest posts with a possibility of filtering.
//      */
//     path: 'discover',
//     component: DiscoverComponent,
//     data: { identifier: 'discover' }
//   }, {
//     /**
//      *  Rated post feed.
//      *  Feed of rated post of the logged in user.
//      */
//     path: 'rated',
//     component: RatedComponent,
//     data: { identifier: 'rated' }
//   }, {
//     /**
//      * Friend post feed.
//      * Feed of logged in user's friend's posts.
//      */
//     path: 'friends',
//     component: FriendsComponent,
//     data: { identifier: 'friends' }
//   }, {
//     path: 'home',
//     component: HomeComponent,
//     data: { identifier: 'home' }
//   }, {
//     /**
//      * Profile page.
//      * Contains information about a person.
//      */
//     path: 'profile/:slug',
//     component: ProfileComponent,
//     data: { identifier: 'profile' }
//   }, {
//     /**
//      *  Tag post feed.
//      *  Contains posts with the specified tag.
//      */
//     path: 'tag/:tag',
//     component: TagComponent,
//     data: { identifier: 'tag' }
//   }, {
//     /**
//      * Post page.
//      * Contains full info of the specified post.
//      */
//     path: 'post/:id',
//     component: PostComponent,
//     data: { identifier: 'post' }
//   }, {
//     /**
//      * No suffix –> redirect to /discover.
//      */
//     path: '',
//     pathMatch: 'full',
//     redirectTo: '/discover'
//   }, {
//     /**
//      * Default: Error page.
//      */
//     path: '**',
//     component: PageNotFoundComponent,
//     data: { identifier: 'error' }
//   }
// ];
