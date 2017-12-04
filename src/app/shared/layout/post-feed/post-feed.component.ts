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

  private page: number = 1;

  private tmpFeed: IPost[] = [];

  private posts: IPost[] = [];


  private failPostRequestCounter: number = 0;

  private postRequestsFailed: boolean = false;

  private loadingPostSubscription: any;



  constructor(private postService: PostService, private authService: AuthService) {

  }

  public ngOnInit():void {


    this.userLogged = this.authService.isLoggedIn();

    this.postService.postsLoaded$.subscribe(
      posts => {
        this.posts = posts;
      }
    );

    this.authService.userLoggedIn$.subscribe (
      user => {
        //console.log("post feed detected: user logged in");
        this.userLogged = !!user;
        //console.log(this.userLogged);
      }
    )

    this.postService.postFilter$.subscribe(
      params => {
        this.params = params;
        this.page = 1;
        this.posts = this.tmpFeed = [];
        this.loadingPostSubscription.unsubscribe();
        this.loadingPosts = false;
        this.loadPosts();
      }
    )

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

    console.log("loading posts...");
    this.loadingPosts = true;

    this.loadingPostSubscription = this.postService.getAllPosts(this.params, this.page, appConfig.feed.limit)
      .subscribe(
        posts => {

          //console.log(posts);
          //console.log("fails: " + this.failPostRequestCounter);


          let postCount = posts.length;

          // console.log("***********************************");
          // console.log("----------------");
          // console.log("this.posts:   " + this.posts.length);
          // console.log("this.tmpFeed: " + this.tmpFeed.length);
          // console.log("posts:        " + postCount);
          // console.log("page:         " + this.page);
          // console.log("----------------");


          if(postCount <= 0) {
            this.failPostRequestCounter++;
            this.loadingPosts = false;
            return;
          }

          // console.log("p-len: " + postCount);
          // console.log("limit: " + appConfig.feed.limit);

          if(postCount == appConfig.feed.limit) {
            console.log("dostatek postů");
            this.tmpFeed = this.tmpFeed.concat(posts);
            this.posts = this.tmpFeed;
            this.page++;
            this.failPostRequestCounter = 0;
          } else {
            //console.log("NEDOSTATEK postů");

            //nedostali jsme plný počet postů
            //this.tmpFeed = this.posts;
            this.posts = this.tmpFeed;
            this.posts = this.posts.concat(posts);
            this.failPostRequestCounter++;

            //if(this.posts.length > appConfig.feed.limit || this.posts.length == 0)
            //  this.posts = this.posts.concat(posts);
          }

          // console.log("----------------");
          // console.log("this.posts:   " + this.posts.length);
          //  console.log("this.tmpFeed: " + this.tmpFeed.length);
          //  console.log("posts:        " + postCount);
          //  console.log("page:         " + this.page);
          //  console.log("----------------");

          //console.log("posts:");
          //console.log(this.posts);


          this.loadingPosts = false;
        },

        error => {
          //console.log(error);
        }
    );

    /**
    setTimeout(() => {
      console.log("unsubscribeee");
      this.loadingPostSubscription.unsubscribe();
      this.loadingPosts = false;
      this.failPostRequestCounter++;
    }, 4000);
     **/
  }

  resetAndLoadPosts(e): void {
    e.preventDefault();
    this.failPostRequestCounter = 0;
    this.postRequestsFailed = false;
    this.loadingPosts = false;
    this.loadPosts();
  }
}
