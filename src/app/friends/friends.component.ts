import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import salvattore from 'salvattore'

declare let $: any;


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html'
})
export class FriendsComponent implements OnInit {

  posts;


  constructor() {
    this.posts = [
      {
        title: 'How to treat a cat.',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images: [
          'assets/images/cat.jpg'
        ],
        tags: [
          'cat', 'care', 'treatment', 'cure'
        ],
        rating: 10
      }, {
        title: 'The shortest way Václavské náměstí – Staroměstské náměstí',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images: [
          'assets/images/map.png'
        ],
        tags: [
          'map', 'traveling', 'way', 'trip'
        ]
      }, {
        title: 'How to treat a cat.',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images: [
          'assets/images/cat.jpg'
        ],
        tags: [
          'cat', 'care', 'treatment', 'cure'
        ]
      }, {
        title: null,
        body: null,
        images: [
          'assets/images/coffee.png'
        ],
        tags: [
          'coffee', 'preparation', 'drip', 'hario', 'v60'
        ]
      }, {
        title: 'The shortest way Václavské náměstí – Staroměstské náměstí',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images: [
          'assets/images/map.png'
        ],
        tags: [
          'map', 'traveling', 'way', 'trip'
        ]
      }, {
        title: null,
        body: null,
        images: [
          'assets/images/coffee.png'
        ],
        tags: [
          'coffee', 'preparation', 'drip', 'hario', 'v60'
        ],
        rating: 69
      }, {
        title: 'The shortest way Václavské náměstí – Staroměstské náměstí',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images: [
          'assets/images/map.png'
        ],
        tags: [
          'map', 'traveling', 'way', 'trip'
        ]
      }, {
        title: null,
        body: null,
        images: [
          'assets/images/coffee.png'
        ],
        tags: [
          'coffee', 'preparation', 'drip', 'hario', 'v60'
        ]
      }, {
        title: 'How to treat a cat.',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images: [
          'assets/images/cat.jpg'
        ],
        tags: [
          'cat', 'care', 'treatment', 'cure'
        ]
      }
    ];
  }

  ngOnInit() {
    salvattore.recreateColumns($('.feed')[0]);
  }
}
