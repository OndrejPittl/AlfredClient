import { Component, Input } from '@angular/core';
import {IPost} from "../../../model/IPost";

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html'
})

export class PostItemComponent {

  @Input()
  private userLogged: boolean;

  @Input()
  private post: IPost;


  constructor() {

  }

}
