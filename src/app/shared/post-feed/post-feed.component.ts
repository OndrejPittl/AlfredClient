import {Component, Input, AfterViewInit} from '@angular/core';
import salvattore from 'salvattore'

declare let $: any;


@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html'
})
export class PostFeedComponent implements AfterViewInit {

  @Input()
  posts;

  constructor() { }

  ngAfterViewInit() {
    salvattore.recreateColumns($('.feed')[0]);
  }

}
