import {Component, Input, AfterViewInit, AfterViewChecked, OnChanges, OnInit} from '@angular/core';
import salvattore from 'salvattore'
import savvior from 'savvior'
import { MasonryModule } from 'angular2-masonry';
import {PostService} from "../../../services/post.service";
import {IPost} from "../../../model/IPost";
import {appConfig} from "../../../app.config";
import {post} from "selenium-webdriver/http";

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



  private loadingPosts: boolean = false;

  private page: number = 1;

  // záloha OK feedu
  private tmpFeed: any[] = [];

  // záloha nových postů, jejichž počet nedosahuje limitu
  //private tmpNewPosts: any[];

  // zobrazovaný feed
  private posts: any[] = [];





  constructor(private postService: PostService) {
    this.postService.postsLoaded$.subscribe(
      posts => {
        this.posts = posts;
      }
    );
  }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts():void {
    if(this.loadingPosts) {
      return;
    }

    console.log("loading posts...");
    this.loadingPosts = true;

    console.log("params: ");
    console.log(this.params);

    let sub = this.postService.getAllPosts(this.params, this.page, appConfig.feed.limit)
      .subscribe(
        posts => {

          let postCount = posts.length;

          // console.log("***********************************");
          // console.log("----------------");
          // console.log("this.posts:   " + this.posts.length);
          // console.log("this.tmpFeed: " + this.tmpFeed.length);
          // console.log("posts:        " + postCount);
          // console.log("page:         " + this.page);
          // console.log("----------------");


          if(postCount <= 0) {
            return;
          }

          if(postCount == appConfig.feed.limit) {
            //console.log("dostatek postů");
            this.tmpFeed = this.tmpFeed.concat(posts);
            this.posts = this.tmpFeed;
            this.page++;
          } else {
            //console.log("NEDOSTATEK postů");

            //nedostali jsme plný počet postů
            //this.tmpFeed = this.posts;
            this.posts = this.tmpFeed;
            this.posts = this.posts.concat(posts);

            //if(this.posts.length > appConfig.feed.limit || this.posts.length == 0)
            //  this.posts = this.posts.concat(posts);
          }

          // console.log("----------------");
          // console.log("this.posts:   " + this.posts.length);
          // console.log("this.tmpFeed: " + this.tmpFeed.length);
          // console.log("posts:        " + postCount);
          // console.log("page:         " + this.page);
          // console.log("----------------");

          //console.log("posts:");
          //console.log(this.posts);


          this.loadingPosts = false;
        }
    );

    setTimeout(() => {
      sub.unsubscribe();
      this.loadingPosts = false;
    }, 4000);
  }
}
