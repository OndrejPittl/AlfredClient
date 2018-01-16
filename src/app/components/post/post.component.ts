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
      .subscribe(user => {
        this.registerUserLoggedChange(user);
        this.loadPost();
      }
    );

    this.authService.userLoggedIn$.subscribe (
      user => this.registerUserLoggedChange(user)
    );

    this.authService.userLoggedOut$.subscribe (
      () => this.registerUserLoggedChange(null)
    );

    this.postService.postsLoaded$.subscribe(
      (posts: IPost[]) => {
        if(posts.length > 0) {
          this.post = posts[0];
          console.log("POST UPDATED!");

        }
    })
  }

  ngOnDestroy() {

  }

  private loadPost(): void {
    this.route.params.subscribe(params => {
      this.postID = +params['id'];

      this.postService.getPost(this.postID)
        .subscribe(
          post => {

            if(this.user != null) {
              post = this.postService.updatePostRated(post, this.user.id);
            }

            this.post = post;



            this.postLoaded = true;
            console.log(post);
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
      .subscribe(() => this.router.navigate(['discover']));
  }
}
