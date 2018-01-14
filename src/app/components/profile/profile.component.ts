import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {PostSource} from "../../model/PostSource";
import {PostFeedPage} from "../PostFeedPage";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent extends PostFeedPage implements OnInit {

  private isUserLogged: boolean = false;

  private isAuthorizedUser: boolean = false;

  /**
   *  Currently viewed user.
   */
  private user: any;




  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService) {
    super();
  }

  ngOnInit() {
    this.params.postSource = PostSource.USER;

    this.isUserLogged = this.authService.isLoggedIn();

    this.authService.userLoggedIn$.subscribe(
      user => this.isUserLogged = !!user
    );

    this.route.params.subscribe(
      routeParams => this.userService.getUserBySlug(routeParams['slug'])
        .subscribe(
          user => {
            this.user = user;

            this.params.addFilterParam('authorSlug', this.user.slug);
            this.params.addFilterParam('authorId', this.user.id);

            this.authService.getLoggedUser().subscribe(
              u => {
                this.isAuthorizedUser = u.id == this.user.id;
              }
            );
          }
        )
    );
  }
}
