import {Component, Input, AfterViewInit, AfterViewChecked, OnChanges, OnInit} from '@angular/core';
import salvattore from 'salvattore'
import savvior from 'savvior'
import { MasonryModule } from 'angular2-masonry';
import {PostService} from "../../../services/post.service";
import {IPost} from "../../../model/IPost";
import {appConfig} from "../../../app.config";
import {post} from "selenium-webdriver/http";
import {AuthService} from "../../../services/auth.service";
import {Params} from "../../../model/Params";

declare let $: any;


@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html'
})

export class PostFeedComponent implements OnInit {

  @Input()
  private params: Params;

  @Input()
  private title: string;

  @Input()
  private hasFilteredFeed: boolean;



  private userLogged: boolean;

  private loadingPosts: boolean = false;

  private receivedPostCount: number = 0;

  private posts: IPost[] = [];

  private failPostRequestCounter: number = 0;

  private postRequestsFailed: boolean = false;

  private loadingPostSubscription: any = null;



  constructor(private postService: PostService, private authService: AuthService) {}

  public ngOnInit():void {
    this.reset();
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
      filterParams => {
        this.reset(true);
        this.params.filterParams = filterParams;
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

    this.loadingPostSubscription = this.postService.getPosts(this.params, this.receivedPostCount)
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

  private reset(clearPosts:boolean = true):void {
    this.failPostRequestCounter = 0;
    this.postRequestsFailed = false;
    this.loadingPosts = false;

    if(this.loadingPostSubscription != null) {
      this.loadingPostSubscription.unsubscribe();
    }


    if(clearPosts) {
      this.receivedPostCount = 0;
      this.posts = [];
    }
  }

  private forceLoadPosts(e): void {
    e.preventDefault();
    this.reset(false);
    this.loadPosts();
  }
}
