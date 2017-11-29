import { Component, OnInit, Input } from '@angular/core';

import {User} from "../../../model/user";
import {ActivatedRoute, Params, Router, RoutesRecognized} from "@angular/router";
import {AuthService} from "../../../services/auth.service";


@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html'
})

export class SignInFormComponent implements OnInit {

  @Input() user = new User(0, "", "", "", "", "");

  @Input() formId: string = "";

  private returnUrl: string;

  private sub: any;


  //constructor(private router: Router, private storage: Storage) { }
  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService) {}


  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.returnUrl = params['url'];
    });


  }

  public signIn(event): void {
    this.auth.login(this.user.email, this.user.password);
  }




  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }


}
