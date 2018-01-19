import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {IPost} from "../../../model/IPost";
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";
import {IUser} from "../../../model/IUser";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

declare let $: any;


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html'
})
export class PostFormComponent implements OnInit, AfterViewInit, OnDestroy {

  private alive: boolean = true;

  private post: any = {};

  private isEditingPost: boolean = false;

  private postFileValid: boolean = true;


  @ViewChild('component')
  private component: ElementRef;

  @ViewChild("fileInput")
  private fileInput;


  private modal: any = null;



  constructor(
    private postService: PostService,
    private router: Router) {
  }

  public ngOnInit() {
    this.isEditingPost = false;
    this.init();

    this.postService.modalOpened$
      .takeWhile(() => this.alive)
      .subscribe(
        post => {

          this.init();

          console.log("OPENED");

          if(post == null) {
            // == new post
            this.isEditingPost = false;
            return;
          }

          this.isEditingPost = true;

          this.post.id = post.id;
          this.post.title = post.title;
          this.post.body = post.body;
          this.post.tags = [];

          if(post.image != null && post.image.length > 0) {
            this.post.image = '(image)';
            this.post.file = post.image;
          }

          for(let t of post.tags) {
            this.post.tags.push(t['name']);
          }

          this.modal.open();
        }
      )
  }

  private init(): void {
    console.log("init called");
    this.isEditingPost = false;
    this.post = {
      id: -1,
      title: '',
      body: '',
      image: '',
      tags: [],
      tag: '',
      file: ''
    };
  }

  public prepareForm(): void {

  }

  private addTag($event): void {
    this.post.tags.push(this.post.tag.toLowerCase().replace(/^\s+|\s+$/g, ''));
    this.post.tag = '';
  }

  private removeTag($event):void {
    let clickedTag = $event.currentTarget.innerHTML;
    this.removeFromArray(this.post.tags, clickedTag);
  }

  private fileSelected(image) {
    if(image) {
      this.post.image = image.name;
    } else {
      this.post.image = "";
    }
  }

  private removeImg(): any {
    this.post.image = "";
    this.post.file = null;
    this.fileInput.nativeElement.value = "";
  }

  private removeFromArray(array, item): void {
    let index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  private submitPost(): void {
    console.log("submitPost()");

    delete this.post.tag;


    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload: File = fi.files[0];
      this.postService.readFile(fileToUpload)
        .takeWhile(() => this.alive)
        .subscribe(img => {
          this.post.file = img;
          this.fileInput.nativeElement.value = "";

          console.log("post image processed");
          console.log("triggering post processed");
          console.log(this.post);
          this.postService.registerPostUpdating();
          this.handlePostSubmit();

        });
    } else {

      console.log("triggering post processed");
      console.log(this.post);
      //this.post.file = null;
      this.postService.registerPostUpdating();
      this.handlePostSubmit();

    }

    this.modal.close();
  }

  private handlePostSubmit() {
    // is editting?
    if(this.isEditingPost) {

      console.log("post-form: updating");
      console.log(this.post);

      this.postService.updatePost(this.post)
        .takeWhile(() => this.alive)
        .subscribe (
          (post: IPost) => {
            this.init();
            this.post = post;
            this.isEditingPost = false;
            console.log("submitted (updated) and isEditting=" + this.isEditingPost);
          }
        );

    } else {

      console.log("post-form: creating");

      this.postService.createPost(this.post)
        .takeWhile(() => this.alive)
        .subscribe(
          () => {
            this.init();
            this.isEditingPost = false;
            console.log("submitted (created) and isEditting=" + this.isEditingPost);
            this.router.navigate(['discover']);
          }
        );

    }
  }




  public ngAfterViewInit() {
    console.log("AFTER VIEW INIT");

    if(this.modal == null) {
      this.modal = $(this.component.nativeElement).remodal();

      /*
      this.modal.on('opening', function() {
        alert("x");
      })
      */

      let that = this;

      $(document).on('opening', this.modal, function () {



      });


    }
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.post);
  }


  ngOnDestroy(): void {
    this.alive = false;
  }

  addImage(event) {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      this.post.image = fi.files[0].name;

      this.postService.readFile(fi.files[0])
        .takeWhile(() => this.alive)
        .subscribe(img => {
          this.post.file = img;
          this.postFileValid = this.post.file.length <= 16777215;
        });
    }

  }
}
