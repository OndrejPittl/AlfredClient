import { Component, OnInit } from '@angular/core';
import { PostService } from "../../services/post.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html'
})
export class DiscoverComponent implements OnInit {



  posts;

  constructor(private postService:PostService) {

  }

  ngOnInit() {
    //this.postService.getAllPosts().subscribe(posts => this.posts = posts );
  }

}
