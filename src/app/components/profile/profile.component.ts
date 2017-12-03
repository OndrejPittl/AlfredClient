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
  //private posts: any[];

  private params: any;


  constructor(
    private userService: UserService,
    private postService: PostService,
    private route: ActivatedRoute) { }



  ngOnInit() {
    this.route.params.subscribe(routeParams => {

      // user info
      this.userService.getUserBySlug(routeParams['slug'])
        .subscribe(
          user => {
            this.user = user;

            // --------------------
            // @TODO: odebrat, server nebude posílat
            this.user['password'] = '';
            this.user['confirmPassword'] = '';
            // --------------------


            this.params = {
              author: this.user['slug']
            };

            // user posts info
            /*this.postService.getPostsByUser(this.user.slug)
              .subscribe(
                posts => {
                  this.posts = posts
                }
              );
             */
          }
        );
      }
    );
  }

  ngOnDestroy() {
  }


}
