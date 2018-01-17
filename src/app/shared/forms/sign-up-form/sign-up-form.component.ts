import {Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {IUser} from "../../../model/IUser";
import { Router } from "@angular/router";
import {IValidationError} from "../../../model/IValidationError";
import {Observable} from "rxjs/Observable";
import {User} from "../../../model/User";


@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html'
})

export class SignUpFormComponent implements OnInit, OnDestroy {

  private alive: boolean = true;

  @Input()
  private user:IUser = {
    sex: "MALE"
  } as IUser;

  private formData: FormData;

  @Input()
  private formId: string;

  @Output('edited')
  change: EventEmitter<IUser> = new EventEmitter<IUser>();


  private valid:boolean = false;

  private isSignUpForm: boolean = true;

  private validationMessages: Array<IValidationError>;

  // form fields

  @ViewChild('signUpForm') form;


  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router) { }


  ngOnInit() {
    this.init();
    this.isSignUpForm = this.user['email'] == undefined;
  }

  private init(): void {
    this.validationMessages = [];
  }

  public signUp(event): void {
    this.init();

    console.log("oooooooo signing up");
    console.log(this.user);

    //sign up
    this.userService.createUser(this.user)
      .takeWhile(() => this.alive)
      .subscribe( () => {

          // sign in
          this.authService.auth(this.user['email'], this.user['password'])
            .takeWhile(() => this.alive)
            .subscribe(user => {
              console.log("Sign up form – sign in: User " + user.email + " signed up successfully.");
              this.router.navigate(['discover']);
            },error => {
              console.log("Sign up form – sign in:");
              this.registerErrors(error);
            });

        }, error => {
          console.log("Sign up form – sign up:");
          this.registerErrors(error);
          this.user.password = this.user.confirmPassword = this.user.captcha = "";
        }
    );
  }

  private registerErrors(errors: any): void {
    this.validationMessages = <Array<IValidationError>> errors.error;
    this.valid = false;

    for(let e of this.validationMessages) {
      let err: IValidationError = <IValidationError> e;
      this.form.controls[err.field].setErrors({'incorrect': true, 'serverError': true});
      console.log(this.form.controls[err.field]);
    }
  }


  // TODO: editace údajů
  public doEdit(event): void {
    console.log("TODO: submitting edit of a user:");

    this.userService.updateUser(this.user)
      .takeWhile(() => this.alive)
      .subscribe(user => {
        this.user = user;

        console.log("UPDATED: ");
        console.log(user);

        this.change.emit(user);
      });
  }


  ngOnDestroy(): void {
    this.alive = false;
  }

  cancelEditing() {
    this.change.emit(null);
  }
}
