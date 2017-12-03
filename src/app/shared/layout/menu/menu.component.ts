import { Component, Input, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";

declare let $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  @Input()
  private menuItems: any;

  @Input()
  private menuIdentifier: string;

  @Input()
  private userLogged: boolean;




  private user: any;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    console.log("mmm:");
    console.log(this.userLogged)
  }

}
