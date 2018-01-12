import {Component, Input, AfterViewInit, AfterViewChecked, OnChanges, OnInit} from '@angular/core';
import salvattore from 'salvattore'
import savvior from 'savvior'
import { MasonryModule } from 'angular2-masonry';
import {PostService} from "../../../services/post.service";
import {IPost} from "../../../model/IPost";
import {appConfig} from "../../../app.config";
import {post} from "selenium-webdriver/http";
import {AuthService} from "../../../services/auth.service";

declare let $: any;


@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html'
})

export class PostFeedComponent implements OnInit {

  @Input()
  private params: any = {};

  @Input()
  private title: string;

  private userLogged: boolean;

  private loadingPosts: boolean = false;

  private receivedPostCount: number = 0;

  private posts: IPost[] = [];

  private failPostRequestCounter: number = 0;

  private postRequestsFailed: boolean = false;

  private loadingPostSubscription: any;



  constructor(private postService: PostService, private authService: AuthService) {}

  public ngOnInit():void {
    this.userLogged = this.authService.isLoggedIn();

    this.postService.postsLoaded$.subscribe(
      posts => {
        this.posts = posts;
      }
    );

    this.authService.userLoggedIn$.subscribe (
      user => {
        this.userLogged = !!user;
      }
    );

    this.postService.postFilter$.subscribe(
      params => {
        this.params = params;
        this.posts = [];
        this.loadingPostSubscription.unsubscribe();
        this.loadingPosts = false;
        this.loadPosts();
      }
    );

    this.loadPosts();
  }

  private loadPosts():void {
    if(this.loadingPosts) {
      return;
    }

    if(this.failPostRequestCounter >= appConfig.feed.maxFailRequests) {
      this.postRequestsFailed = true;
      return;
    }

    this.loadingPosts = true;
    console.log("loading posts...");

    this.loadingPostSubscription = this.postService.getAllPosts(this.params, this.receivedPostCount)
      .subscribe(
        posts => {
          let postCount = posts.length;

          if(postCount <= 0) {
            this.failPostRequestCounter++;
            this.loadingPosts = false;
            return;
          }

          this.receivedPostCount += postCount;
          this.posts = this.posts.concat(posts);
          this.loadingPosts = false;
        },

        error => {



        }
    );
  }

  resetAndLoadPosts(e): void {
    e.preventDefault();
    this.failPostRequestCounter = 0;
    this.postRequestsFailed = false;
    this.loadingPosts = false;
    this.loadPosts();
  }
}
