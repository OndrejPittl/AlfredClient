import { Component, OnInit, Input } from '@angular/core';

import {User} from "../../../model/user";


@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html'
})

export class SignInFormComponent implements OnInit {

  @Input() user = new User(0, "", "", "", "", "");

  @Input() formId: string = "";

  submitted = false;


  constructor() { }

  ngOnInit() {}

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }


  public signIn(event): void {
    this.submitted = true;
    console.log(this.user);
  }


}
