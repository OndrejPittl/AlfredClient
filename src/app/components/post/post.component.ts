import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {ActivatedRoute} from "@angular/router";
import {IPost} from "../../model/IPost";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit, OnDestroy {

  private userLogged: boolean;

  private postID: number;

  private post: IPost;


  constructor(
    private postService:PostService,
    private route: ActivatedRoute,
    private authService: AuthService) {

    this.userLogged = authService.isLoggedIn();

    this.route.params.subscribe(params => {
      this.postID = +params['id'];

      this.postService.getPost(this.postID)
        .subscribe(
          post => {
            this.post = post;
            console.log(post);
          }
        );

    });

    this.authService.userLoggedIn$.subscribe(
      user => {
        this.userLogged = !!user;
      }
    );

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
