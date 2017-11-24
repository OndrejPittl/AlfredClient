import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  @Input() menuItems;

  @Input() menuIdentifier : string;

  constructor() {

  }


    ngOnInit() {
      console.log("passed: " + this.menuIdentifier);
    }

}
