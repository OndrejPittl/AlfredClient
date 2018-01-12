import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {PostService} from "../../services/post.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy, AfterViewInit {


  private userLogged: boolean;

  private userAuthorized: boolean;



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
    private route: ActivatedRoute,
    private authService: AuthService) {

    this.userLogged = false;
    this.userAuthorized = false;
  }

  ngOnInit() {
    this.userLogged = this.authService.isLoggedIn();

    this.authService.userLoggedIn$.subscribe(
      user => this.userLogged = !!user
    );

    this.route.params.subscribe(
      routeParams => this.userService.getUserBySlug(routeParams['slug'])
        .subscribe(
          user => {
            this.user = user;
            this.user['password'] = '';
            this.user['confirmPassword'] = '';

            this.params = {
              author: this.user['slug']
            };


            this.authService.getLoggedUser().subscribe(
              u => {
                //this.authService.setLoggedUser(u);
                this.userAuthorized = u.id == this.user.id;
              }
            );
          }
        )
    );
  }

  public ngAfterViewInit():void {


  }

  ngOnDestroy() {

  }


}
