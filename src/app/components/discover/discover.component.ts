import {Component, OnInit} from '@angular/core';
import {PostSource} from "../../model/PostSource";
import {PostFeedPage} from "../PostFeedPage";



@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html'
})
export class DiscoverComponent extends PostFeedPage implements OnInit {

  // inherited: params, _hasFilteredFeed

  constructor() {
    super();
  }

  ngOnInit() {
    this.params.postSource = PostSource.GENERAL;
    this.hasFilteredFeed = true;
  }
}
