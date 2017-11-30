import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html'
})
export class FilterFormComponent implements OnInit {

  filter: any = {};

  constructor() { }

  ngOnInit() {

  }

  filterPosts(event: Event):void {

  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.filter); }

}
