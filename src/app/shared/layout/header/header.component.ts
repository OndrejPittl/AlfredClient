import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {appConfig} from "../../../app.config";
import {IUser} from "../../../model/IUser";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderLayoutComponent implements OnInit, OnDestroy {

  private alive: boolean = true;

  public primaryMenuItems: any[];

  private userProfileItemAdded: boolean = false;


  public userLogged: boolean = false;

  private user: IUser = null;



  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.init();

    this.authService.getLoggedUser()
      .takeWhile(() => this.alive)
      .subscribe(user => {
      if(user == null) {
        return;
      }

      this.user = user;
      this.userLogged = true;
      this.addUserProfileMenuItem();
    });

    this.authService.userLoggedIn$
      .takeWhile(() => this.alive)
      .subscribe(
      user => {
        this.user = user;
        this.userLogged = true;
        this.addUserProfileMenuItem();
      }
    );

    this.authService.userLoggedOut$
      .takeWhile(() => this.alive)
      .subscribe(() => this.init());

    this.userService.userUpdated$
      .takeWhile(() => this.alive)
      .subscribe(
        (user: IUser) => {
          this.user = user;

          if(user != null ) {
            this.resetMenu();
            this.userProfileItemAdded = false;
          }

          this.addUserProfileMenuItem();
        }
      );


    this.router.events
      .takeWhile(() => this.alive)
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event) => {
        this.authService.getLoggedUser(true)
          .takeWhile(() => this.alive)
          .subscribe((user) => {
            this.user = user;
          });
      });
  }

  private init(): void {
    this.resetUser();
    this.userProfileItemAdded = false;
    //this.primaryMenuItems = appConfig.menu.primary

    this.resetMenu();
  }

  private resetMenu() {
    this.primaryMenuItems = [];
    for(let item of appConfig.menu.primary) {
      this.primaryMenuItems.push({...item});
    }
  }

  private checkFriendRequests():void {

  }

  private addUserProfileMenuItem(user: IUser = this.user): void {
    if(this.userProfileItemAdded) {
      return;
    }

    this.primaryMenuItems.push({
      'title': user.firstName + ' ' + user.lastName,
      'identificator': 'profile',
      'slug': 'profile/' + user.slug
    });

    this.userProfileItemAdded = true;
  }

  private resetUser(): void {
    this.user = null;
    this.userLogged = false;
  }

  private signInOut(e) {
    e.preventDefault();
    if(this.userLogged) {
      this.resetUser();
      this.authService.logout();
    } else {
      this.authService.kickoff();
    }
  }


  ngOnDestroy(): void {
    this.alive = false;
  }
}
