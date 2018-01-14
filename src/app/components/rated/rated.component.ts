import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import {Params} from "../../model/Params";
import {PostSource} from "../../model/PostSource";
import {PostFeedPage} from "../PostFeedPage";


@Component({
  selector: 'app-rated',
  templateUrl: './rated.component.html'
})
export class RatedComponent extends PostFeedPage implements OnInit {


  constructor() {
    super();
  }

  ngOnInit() {
    this.title = "You have rated";
    this.params.postSource = PostSource.USER_RATED;
  }
}
