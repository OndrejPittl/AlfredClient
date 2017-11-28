import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {PostService} from "../../services/post.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {

  /**
   *  Current user.
   */
  private user: any;

  /**
   * Current user's posts.
   */
  private posts: any[];

  private sub: any;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private route: ActivatedRoute) { }



  ngOnInit() {
    this.sub = this.route.params.subscribe(routeParams => {

      // user info
      this.userService.getUser(routeParams['slug']).subscribe(user => {
        this.user = user;

        // user posts info
        this.postService.getPostsByUser(this.user.id).subscribe(posts => {
          this.posts = posts
        });
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
