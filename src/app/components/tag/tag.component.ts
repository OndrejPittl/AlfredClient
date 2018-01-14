import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {PostService} from "../../services/post.service";
import {ActivatedRoute} from "@angular/router";
import {Params} from "../../model/Params";
import {PostSource} from "../../model/PostSource";
import {PostFeedPage} from "../PostFeedPage";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html'
})
export class TagComponent extends PostFeedPage implements OnInit {

  private tag: string;


  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.params.postSource = PostSource.TAG;

    this.route.params.subscribe(params => {
      this.tag = params['tag'];
      this.params.addFilterParam('tag', this.tag);
      this.title = 'Searching for a #' + this.tag;
    });
  }
}
