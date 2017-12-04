import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

declare let $: any;


@Component({
  selector: 'app-img',
  templateUrl: './img.component.html'
})
export class ImgComponent implements OnInit, AfterViewInit {

  @Input()
  private imgPath: string;

  @Input()
  private withClass: string;

  @Input()
  private isImg: boolean;


  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    $('.image-link').magnificPopup({
      type: 'image',
      key: 'image'
    });
  }
}
