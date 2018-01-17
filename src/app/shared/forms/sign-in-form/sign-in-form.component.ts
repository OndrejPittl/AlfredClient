import {Component, OnInit, Input, OnDestroy} from '@angular/core';

import {ActivatedRoute, Params, Router, RoutesRecognized} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {IUser} from "../../../model/IUser";


@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html'
})

export class SignInFormComponent implements OnInit, OnDestroy {

  private alive: boolean = true;

  @Input()
  private user:IUser = {} as IUser;

  @Input()
  private formId: string;

  private valid: boolean = true;

  private returnUrl: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}


  ngOnInit() {
    this.route.queryParams
      .takeWhile(() => this.alive)
      .subscribe(params => {
      this.returnUrl = params['url'];
    });
  }

  public signIn(event): void {

    // sign in
    this.authService.auth(this.user['email'], this.user['password'])
      .takeWhile(() => this.alive)
      .subscribe(user => {
        //console.log("Sign in form: User " + user.email + " signed in successfully.");
        this.router.navigate(['discover']);
      },error => {
        //console.log("Sign in form:");
        this.user.password = "";
        this.valid = false;
      });
  }


  ngOnDestroy(): void {
    this.alive = false;
  }

// TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }
}
