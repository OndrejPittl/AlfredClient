import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {IPost} from "../../../model/IPost";

declare let $: any;


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html'
})
export class PostFormComponent implements OnInit, AfterViewInit {

  private post: any = {
    id: -1,
    title: '',
    body: '',
    image: '',
    tags: [],
    rating: 0,
    tag: ''
  };

  @ViewChild('component') component: ElementRef;

  private modal: any = null;



  constructor(private postService: PostService) { }

  ngOnInit() { }

  addTag($event): void {
    this.post.tags.push(this.post.tag.toLowerCase());
    this.post.tag = '';
  }

  removeTag($event):void {
    let clickedTag = $event.currentTarget.innerHTML;
    this.removeFromArray(this.post.tags, clickedTag);
  }

  fileSelected(image) {
    if(image) {
      this.post.image = image.name;
    } else {
      this.post.image = "";
    }
  }

  removeImg(): any {
    this.post.image = "";
  }

  private removeFromArray(array, item): void {
    let index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  submitPost(): void {
    this.modal.close();
  }

  ngAfterViewInit() {
    if(this.modal == null) {
      this.modal = $(this.component.nativeElement).remodal();
    }
  }


  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.post);
  }

}
