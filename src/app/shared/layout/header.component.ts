import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderLayoutComponent implements OnInit {
  primaryMenuItems;


  constructor() {
    this.primaryMenuItems = [
      {
        id: 'general-feed',
        title: 'general feed',
      }, {
        id: 'friends-feed',
        title: 'friends feed',
      }, {
        id: 'discover',
        title: 'discover',
      }, {
        id: 'profile',
        title: 'profile',
      }
    ];
  }

  ngOnInit() {
  }

}
