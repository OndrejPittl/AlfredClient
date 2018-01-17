import {Component, OnDestroy, OnInit} from '@angular/core';
import {appConfig} from "../../../app.config";
import {AuthService} from "../../../services/auth.service";
import {IUser} from "../../../model/IUser";

@Component({
  selector: 'app-layout-footer',
  templateUrl: './footer.component.html'
})

export class FooterLayoutComponent implements OnInit, OnDestroy {

  private alive: boolean = true;

  public secondaryMenuItems: any[];

  public userLogged: boolean = false;




  constructor(
    private authService: AuthService) { }

  ngOnInit() {
    this.init();

    this.userLogged = this.authService.isLoggedIn();

    this.authService.userLoggedIn$
      .takeWhile(() => this.alive)
      .subscribe(
      user => this.userLogged = !!user
    );

    this.authService.userLoggedOut$
      .takeWhile(() => this.alive)
      .subscribe(
      () => this.userLogged = false
    );
  }

  private init(): void {
    this.secondaryMenuItems = appConfig.menu.secondary;
  }


  ngOnDestroy(): void {
    this.alive = false;
  }
}
