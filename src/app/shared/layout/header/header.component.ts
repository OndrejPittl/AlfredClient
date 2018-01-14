import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {appConfig} from "../../../app.config";
import {IUser} from "../../../model/IUser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderLayoutComponent implements OnInit {

  public primaryMenuItems: any[];

  private userProfileItemAdded: boolean = false;


  public userLogged: boolean = false;

  private user: IUser = null;



  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.init();

    this.authService.getLoggedUser().subscribe(user => {

      if(user == null) {
        return;
      }

      this.user = user;
      this.userLogged = true;
      this.addUserProfileMenuItem();
    });

    this.authService.userLoggedIn$.subscribe(
      user => {
        this.user = user;
        this.userLogged = true;
        this.addUserProfileMenuItem();
      }
    );

    this.authService.userLoggedOut$.subscribe(
      () => {
        console.log("Header: logged OUT");
        this.resetUser();
      }
    );
  }

  private init(): void {
    this.resetUser();
    this.primaryMenuItems = appConfig.menu.primary;
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
      this.router.navigate(['welcome']);
    }
  }
}
