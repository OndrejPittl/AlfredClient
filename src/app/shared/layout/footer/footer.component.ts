import { Component, OnInit } from '@angular/core';
import {appConfig} from "../../../app.config";
import {AuthService} from "../../../services/auth.service";
import {IUser} from "../../../model/IUser";

@Component({
  selector: 'app-layout-footer',
  templateUrl: './footer.component.html'
})

export class FooterLayoutComponent implements OnInit {

  public secondaryMenuItems: any[];

  public userLogged: boolean = false;




  constructor(
    private authService: AuthService) { }

  ngOnInit() {
    this.init();

    this.userLogged = this.authService.isLoggedIn();

    this.authService.userLoggedIn$.subscribe(
      user => this.userLogged = !!user
    );

    this.authService.userLoggedOut$.subscribe(
      () => this.userLogged = false
    );
  }

  private init(): void {
    this.secondaryMenuItems = appConfig.menu.secondary;
  }

}
