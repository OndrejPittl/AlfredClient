import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './footer.component.html'
})

export class FooterLayoutComponent implements OnInit {
  secondaryMenuItems;

  constructor() {
    this.secondaryMenuItems = [
      {
        id: 'general-feed',
        slug: 'home',
        title: 'general',
      }, {
        id: 'friends-feed',
        slug: 'friends',
        title: 'friends',
      }, {
        id: 'discover-feed',
        slug: 'discover',
        title: 'discover',
      }
    ];
  }

  ngOnInit() {
  }

}
