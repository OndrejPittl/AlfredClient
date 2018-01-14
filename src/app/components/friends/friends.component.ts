import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import {Params} from "../../model/Params";
import {PostSource} from "../../model/PostSource";
import {PostFeedPage} from "../PostFeedPage";


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html'
})
export class FriendsComponent extends PostFeedPage implements OnInit {

  // inherited: title, params, _hasFilteredFeed


  constructor() {
    super();
  }

  ngOnInit() {
    this.title = "What do your friends know?";
    this.params.postSource = PostSource.FRIENDS;
  }
}






