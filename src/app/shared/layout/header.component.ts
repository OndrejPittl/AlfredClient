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
        slug: 'home',
        title: '#general',
      }, {
        id: 'friends-feed',
        slug: 'friends',
        title: '#friends',
      }, {
        id: 'personal-feed',
        slug: 'personal',
        title: '#personal',
      }, {
        id: 'profile',
        slug: 'profile/alfred-nobel',
        title: 'Alfred Nobel',
      }
    ];
  }

  ngOnInit() {
  }

}
