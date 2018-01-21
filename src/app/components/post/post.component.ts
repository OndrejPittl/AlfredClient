import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IPost} from "../../model/IPost";
import {AuthService} from "../../services/auth.service";
import {IUser} from "../../model/IUser";
import {RatingService} from "../../services/rating.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit, OnDestroy {

  private alive: boolean = true;

  private updating: boolean = false;

  private user: IUser = null;

  private userLogged: boolean = false;

  private hasUserRated: boolean = false;


  private postID: number;

  private post: IPost = null;

  private postLoaded: boolean = false;


  constructor(
    private postService:PostService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private ratingService: RatingService,
    private router: Router) {
  }

  ngOnInit() {
    this.userLogged = false;

    this.authService.getLoggedUser()
      .takeWhile(() => this.alive)
      .subscribe(user => {
        this.registerUserLoggedChange(user);
        this.loadPost();
      }
    );

    this.authService.userLoggedIn$
      .takeWhile(() => this.alive)
      .subscribe (
      user => this.registerUserLoggedChange(user)
    );

    this.authService.userLoggedOut$
      .takeWhile(() => this.alive)
      .subscribe (
      () => this.registerUserLoggedChange(null)
    );

    this.postService.postBeingUpdated$
      .takeWhile(() => this.alive)
      .subscribe (
        () => this.updating = true
      );

    this.postService.postsLoaded$
      .takeWhile(() => this.alive)
      .subscribe(
      (posts: IPost[]) => {
        this.updating = false;
        if(posts.length > 0) {
          this.post = posts[0];
        }
    })
  }

  private loadPost(): void {
    this.route.params
      .takeWhile(() => this.alive)
      .subscribe(params => {
      this.postID = +params['id'];

      this.postService.getPost(this.postID)
        .takeWhile(() => this.alive)
        .subscribe(
          post => {

            if(this.user != null) {
              post = this.postService.updatePostRated(post, this.user.id);
            }

            this.post = post;
            this.postLoaded = true;
          },
          err =>{
            this.post = null;
            this.postLoaded = true;
          }
        );
    });
  }

  private registerUserLoggedChange(user: IUser) {
    if(user == null) {
      this.resetUser();
      return;
    }

    this.user = user;
    this.userLogged = true;
  }

  private resetUser():void {
    this.user = null;
    this.userLogged = false;
  }

  private togglePostRating(postId: number): void {
    let hasRated: boolean = this.post.userRated;

    this.ratingService.togglePostRating(postId, hasRated)
      .takeWhile(() => this.alive)
      .subscribe((post: IPost) => {
        this.post = post;
        this.post.userRated = !hasRated;
      });
  }

  private editPost() {
    this.postService.registerEditing(this.post);
  }

  private deletePost() {
    this.postService.deletePost(this.post.id)
      .takeWhile(() => this.alive)
      .subscribe(() => this.router.navigate(['discover']));
  }

  public ngOnDestroy(): void {
    this.alive = false;
  }
}
