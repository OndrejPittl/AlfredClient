import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {appConfig} from "../../../app.config";
import {IUser} from "../../../model/IUser";

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderLayoutComponent implements OnInit {

  primaryMenuItems: any[];


  constructor(private authService: AuthService) {
    this.primaryMenuItems = appConfig.menu.primary;

    if(authService.isLoggedIn()) {
      authService.getLoggedUser().subscribe(user => {
        this.addUserProfileMenuItem(user);
      });
    }

    authService.userLoggedIn$.subscribe(
      user => {
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

  logout() {
    this.authService.logout();
  }

}
