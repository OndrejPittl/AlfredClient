import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit, OnDestroy {

  postID: number;

  post;

  private sub: any;


  constructor(
    private postService:PostService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.postID = +params['id'];
      this.postService.getPost(this.postID).subscribe(post => this.post = post );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
