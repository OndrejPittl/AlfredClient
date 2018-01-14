import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {IUser} from "../../../model/IUser";
import { Router } from "@angular/router";
import {IValidationError} from "../../../model/IValidationError";


@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html'
})

export class SignUpFormComponent implements OnInit {

  @Input()
  private user:IUser = {
    sex: "MALE"
  } as IUser;

  private formData: FormData;

  @Input()
  private formId: string;

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

    //sign up
    this.userService.createUser(this.user)
      .subscribe( () => {

          // sign in
          this.authService.auth(this.user['email'], this.user['password'])
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
    console.log(this.user);
  }
}
