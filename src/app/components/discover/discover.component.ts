import { Component, OnInit } from '@angular/core';
import { PostService } from "../../services/post.service";


@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html'
})
export class DiscoverComponent implements OnInit {

  posts;

  constructor(private postService:PostService) {

  }

  ngOnInit() {
    this.postService.getAllPosts().subscribe(posts => this.posts = posts );
  }

}
