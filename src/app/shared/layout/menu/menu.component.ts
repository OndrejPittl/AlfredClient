import { Component, Input, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  @Input() menuItems;

  @Input() menuIdentifier : string;

  private user: any;

  constructor(private authService: AuthService) { }

  ngOnInit() { }
}
