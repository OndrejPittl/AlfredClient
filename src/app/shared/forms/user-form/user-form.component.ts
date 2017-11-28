import { Component, OnInit, Input } from '@angular/core';

import {User} from "../../../model/user";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})

export class UserFormComponent implements OnInit {

  @Input() user = new User(0, "", "", "", "", "");

  @Input() formId: string = "";

  isSignUp: boolean = true;

  submitted = false;


  constructor() { }

  ngOnInit() {
    this.isSignUp = this.user !== undefined;
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