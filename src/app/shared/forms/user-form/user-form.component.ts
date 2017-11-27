import { Component, OnInit, Input } from '@angular/core';

import {User} from "../../../model/user";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})

export class UserFormComponent implements OnInit {


  @Input() user;

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  constructor() { }

  ngOnInit() {

  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }


  public signUp(event): void {
    console.log(this.user);
  }

  public doEdit(event): void {
    console.log(this.user);
  }


}
