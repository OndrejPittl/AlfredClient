import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html'
})
export class FilterFormComponent implements OnInit {

  private filter: any = {};

  constructor(private postService: PostService) { }

  ngOnInit() {

  }

  filterPosts(event: Event):void {
    this.postService.filterPosts(this.filter);
  }

  resetFilter(): void {
    this.postService.filterPosts(null);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.filter); }

}
