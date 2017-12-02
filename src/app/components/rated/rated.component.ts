import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";


@Component({
  selector: 'app-rated',
  templateUrl: './rated.component.html'
})
export class RatedComponent implements OnInit {

  title: string = "You have rated";

  posts;

  constructor(private postService:PostService) { }

  ngOnInit() {
    this.postService.getAllPosts().subscribe(posts => this.posts = posts );
  }


}
