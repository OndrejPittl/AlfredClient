import {Component, Input, AfterViewInit, AfterViewChecked, OnChanges} from '@angular/core';
import salvattore from 'salvattore'
import savvior from 'savvior'
import { MasonryModule } from 'angular2-masonry';
import {PostService} from "../../../services/post.service";
import {IPost} from "../../../model/IPost";

declare let $: any;


@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html'
})
export class PostFeedComponent {

  @Input() title;

  @Input() posts;


  constructor(private postService: PostService) {
    this.postService.postsLoaded$.subscribe(
      posts => {
        this.posts = posts;
      }
    );
  }
}
