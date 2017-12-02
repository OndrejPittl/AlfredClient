import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html'
})

export class SignUpFormComponent implements OnInit {

  @Input() user = {};

  @Input() formId: string = "";

  isSignUp: boolean = true;

  submitted = false;


  constructor() { }

  ngOnInit() {
    this.isSignUp = this.user['email'] == undefined;
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }


  public signUp(event): void {
    this.submitted = true;
    console.log(this.user);
  }

  public doEdit(event): void {
    this.submitted = true;
    console.log(this.user);
  }


}
