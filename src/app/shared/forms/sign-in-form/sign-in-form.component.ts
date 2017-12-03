import { Component, OnInit, Input } from '@angular/core';

import {ActivatedRoute, Params, Router, RoutesRecognized} from "@angular/router";
import {AuthService} from "../../../services/auth.service";


@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html'
})

export class SignInFormComponent implements OnInit {

  @Input()
  private user = {};

  @Input()
  private formId: string;

  private valid: boolean = true;

  private returnUrl: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['url'];
    });
  }

  public signIn(event): void {

    // autentizace
    this.valid = this.auth.authenticate(
      this.user['email'],
      this.user['password']
    );

    // clear bound pwd
    if(!this.valid) {
      this.user = {
        email: this.user['email']
      };
    }
  }


  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }
}
