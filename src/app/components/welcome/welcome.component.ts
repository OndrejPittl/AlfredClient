import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {
  router: Router;
  loggedIn = true;

  constructor() {


    if(!this.loggedIn) {

      // redirectuje do /, kde se nenačtou posty
      this.router.navigate(["/home"]);
    }
  }

  ngOnInit() {
  }

}
