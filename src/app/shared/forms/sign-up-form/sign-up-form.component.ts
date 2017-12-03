import { Component, OnInit, Input } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {IUser} from "../../../model/IUser";


@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html'
})

export class SignUpFormComponent implements OnInit {

  @Input()
  private user:IUser = {} as IUser;

  @Input()
  private formId: string;

  private valid:boolean = false;

  private isSignUpForm: boolean = true;


  constructor(private userService: UserService, private authService: AuthService) { }


  ngOnInit() {
    this.isSignUpForm = this.user['email'] == undefined;
  }

  public signUp(event): void {
    this.userService.addUser(this.user).subscribe(
      () => this.authService.authenticate(this.user['email'], this.user['password']),
      error => this.valid = false
    );
  }

  // TODO: editace údajů
  public doEdit(event): void {
    console.log("TODO: submitting edit of a user:");
    console.log(this.user);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }

}
