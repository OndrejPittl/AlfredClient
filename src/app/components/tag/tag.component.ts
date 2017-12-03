import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {PostService} from "../../services/post.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html'
})
export class TagComponent implements OnInit, OnDestroy {

  private title: string;

  private tag: string;

  private params: any;


  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let tag = params['tag'];
      //this.tag = params['tag'];
      //this.postService.getPostByTag(this.tag).subscribe(posts => this.posts = posts );

      this.title = 'Searching for a #' + tag + '';

      this.params = {
        'tag': params['tag']
      };
    });
  }

  ngOnDestroy() {

  }

}
