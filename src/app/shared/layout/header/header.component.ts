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

  public userLogged: boolean;

  public primaryMenuItems: any[];


  constructor(private authService: AuthService, private router: Router) {
    this.primaryMenuItems = appConfig.menu.primary;
    this.userLogged = authService.isLoggedIn();

    if(this.userLogged) {
      authService.getLoggedUser().subscribe(user => {
        this.addUserProfileMenuItem(user);
      });
    }

    authService.userLoggedIn$.subscribe(
      user => {
        this.userLogged = !!user;
        this.addUserProfileMenuItem(user);
      }
    );
  }

  ngOnInit() {

  }

  private addUserProfileMenuItem(user: IUser): void {
    this.primaryMenuItems.push({
      'title': user.firstName + ' ' + user.lastName,
      'identificator': 'profile',
      'slug': 'profile/' + user.slug
    });
  }

  signInOut(e) {
    e.preventDefault();
    if(this.userLogged) this.authService.logout();
    else this.router.navigate(['welcome']);
  }

}
