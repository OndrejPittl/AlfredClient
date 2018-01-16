import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {IPost} from "../../../model/IPost";
import {appConfig} from "../../../app.config";
import {AuthService} from "../../../services/auth.service";
import {Params} from "../../../model/Params";
import {IUser} from "../../../model/IUser";


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


  private user: IUser = null;

  private userLogged: boolean;

  private loadingPosts: boolean = false;

  private receivedPostCount: number = 0;

  private posts: IPost[] = [];

  private failPostRequestCounter: number = 0;

  private postRequestsFailed: boolean = false;

  private loadingPostSubscription: any = null;



  constructor(
    private postService: PostService,
    private authService: AuthService) {}

  public ngOnInit(): void {
    this.reset(true);
    //this.userLogged = this.authService.isLoggedIn();
    this.userLogged = false;

    this.authService.getLoggedUser().subscribe(
      user => {
        this.user = user;

        if(user != null) {
          this.userLogged = true;
        }

        this.loadPosts();
      }
    );

    this.postService.postsLoaded$.subscribe(
      posts => {
        this.posts = posts;
      }
    );


    this.authService.userLoggedIn$.subscribe (
      user => {
        this.user = user;
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

          if(this.user != null) {
            posts = this.postService.updatePostsRated(posts, this.user.id);
          }

          console.log("------------ posts: ");
          console.log(posts);


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
