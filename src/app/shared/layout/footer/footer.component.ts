import { Component, OnInit } from '@angular/core';
import {appConfig} from "../../../app.config";
import {AuthService} from "../../../services/auth.service";
import {IUser} from "../../../model/IUser";

@Component({
  selector: 'app-layout-footer',
  templateUrl: './footer.component.html'
})

export class FooterLayoutComponent implements OnInit {
  secondaryMenuItems;

  private userLogged: boolean;

  constructor(private authService: AuthService) {
    this.secondaryMenuItems = appConfig.menu.secondary;
    this.userLogged = this.authService.isLoggedIn();

    this.authService.userLoggedIn$.subscribe(
      user => this.userLogged = !!user
    );
  }

  ngOnInit() {

  }

}
