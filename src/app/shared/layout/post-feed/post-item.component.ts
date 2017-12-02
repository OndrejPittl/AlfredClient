import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html'
})

export class PostItemComponent {

  @Input()
  post;

  constructor() {}

}
