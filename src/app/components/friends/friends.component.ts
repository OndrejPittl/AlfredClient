import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html'
})
export class FriendsComponent implements OnInit {

  posts;

  constructor(private postService:PostService) {

  }

  ngOnInit() {
    this.postService.getAllPosts().subscribe(posts => this.posts = posts );
  }
}
