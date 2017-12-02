import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post.service";
import {IPost} from "../../../model/IPost";



@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html'
})
export class PostFormComponent implements OnInit {

  private post: any = {
    id: -1,
    title: '',
    body: '',
    images: [],
    tags: [],
    rating: 0,
    tag: ''
  };

  constructor(private postService: PostService) { }

  ngOnInit() {

  }

  addTag(): void {
    this.post.tags.push(this.post.tag.toLowerCase());
    this.post.tag = '';
  }

  removeTag($event):void {
    let clickedTag = $event.currentTarget.innerHTML;
    this.removeFromArray(this.post.tags, clickedTag);
  }

  fileSelected(image: any) {
    this.post.images = [];
    this.post.images.push(image.name);
  }

  removeImg($event): any {
    let clickedImg = $event.currentTarget.innerHTML;
    this.removeFromArray(this.post.images, clickedImg);
  }

  private removeFromArray(array, item): void {
    let index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  submitPost(): void {

  }



  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.post);
  }

}
