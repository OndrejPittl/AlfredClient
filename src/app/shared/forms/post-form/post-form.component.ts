import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {IPost} from "../../../model/IPost";
import {Router} from "@angular/router";

declare let $: any;


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html'
})
export class PostFormComponent implements OnInit, AfterViewInit, OnDestroy {

  private alive: boolean = true;

  private post: any = {};

  private isEditingPost: boolean = false;


  @ViewChild('component')
  private component: ElementRef;

  @ViewChild("fileInput")
  private fileInput;


  private modal: any = null;



  constructor(
    private postService: PostService,
    private router: Router) {}

  private init(): void {

    this.post = {
      id: -1,
      title: '',
      body: '',
      image: '',
      tags: [],
      tag: ''
    };

    this.isEditingPost = false;
  }

  public ngOnInit() {
    this.init();

    this.postService.modalOpened$
      .takeWhile(() => this.alive)
      .subscribe(
      post => {

        if(post == null) {
          this.init();
          return;
        }


        this.isEditingPost = true;

        this.post.id = post.id;
        this.post.title = post.title;
        this.post.body = post.body;
        //this.post.image
        this.post.tags = [];

        for(let t of post.tags) {
          this.post.tags.push(t['name']);
        }

        this.modal.open();
      }
    )
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
  }

  private removeFromArray(array, item): void {
    let index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  private submitPost(): void {
    delete this.post.tag;

    if(this.isEditingPost) {

      this.postService.updatePost(this.post)
        .takeWhile(() => this.alive)
        .subscribe (
        (post: IPost) => {
          this.post = post;
          this.isEditingPost = false;
        }
      );

    } else {

      delete this.post.id;


      let fi = this.fileInput.nativeElement;
      if (fi.files && fi.files[0]) {
        let fileToUpload: File = fi.files[0];
        this.postService.readFile(fileToUpload)
          .subscribe(img => {
            this.post.file = img;
            this.postService.createPost(this.post)
              .subscribe(() => this.router.navigate(['discover']));
          });
      }





      /*
      let formData: FormData = new FormData();

      let fi = this.fileInput.nativeElement;
      if (fi.files && fi.files[0]) {
        let fileToUpload = fi.files[0];

        formData.append("file", fileToUpload);

        this.postService.imageTest(fileToUpload)
          .subscribe(res => {
            //console.log(res);
          },
            error => {
              //console.error(error);
            });
        }
      */




    }

    this.modal.close();
  }




  public ngAfterViewInit() {
    if(this.modal == null) {
      this.modal = $(this.component.nativeElement).remodal();
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
      this.post.image = fi.files[0];
      //console.log("__________ image added:");
      //console.log(this.post);
    }

  }
}
