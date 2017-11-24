import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {

  post;

  constructor() {
    this.post = {
      title: 'How to treat a cat.',
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      images: [
        'assets/images/cat.jpg'
      ],
      tags: [
        'cat', 'care', 'treatment', 'cure'
      ],
      rating: 10
    };
  }

  ngOnInit() {
  }

}
