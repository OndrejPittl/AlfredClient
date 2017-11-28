import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {PostService} from "../../services/post.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html'
})
export class TagComponent implements OnInit, OnDestroy {

  private sub: any;
  private tag: string;
  private posts: any[];

  constructor(private route: ActivatedRoute, private postService: PostService) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.tag = params['tag'];
      this.postService.getPostByTag(this.tag).subscribe(posts => this.posts = posts );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
