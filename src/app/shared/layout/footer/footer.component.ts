import { Component, OnInit } from '@angular/core';
import {appConfig} from "../../../app.config";

@Component({
  selector: 'app-layout-footer',
  templateUrl: './footer.component.html'
})

export class FooterLayoutComponent implements OnInit {
  secondaryMenuItems;

  constructor() {
    this.secondaryMenuItems = appConfig.menu.secondary;
  }

  ngOnInit() { }

}
