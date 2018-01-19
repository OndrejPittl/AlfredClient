import { Component, Input, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {PostService} from "../../../services/post.service";

declare let $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  @Input()
  private menuItems: any;

  @Input()
  private menuIdentifier: string;

  @Input()
  private userLogged: boolean;


  constructor(private postService: PostService) { }

  ngOnInit() { }

  private newPostTriggered(): void {
    console.log("--");
    this.postService.registerNewPostModal();
  }

}
