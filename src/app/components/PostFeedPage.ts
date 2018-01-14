import {Params} from "../model/Params";
import {OnInit} from "@angular/core";

export abstract class PostFeedPage {

  /**
   * Does page have filtered post feed?
   */
  protected _hasFilteredFeed: boolean = false;

  /**
   * Post feed params dependent on specific page.
   */
  protected _params: Params;

  /**
   * Page title.
   */
  protected _title: string = "";



  constructor() {
    this._params = new Params();
  }

  get hasFilteredFeed(): boolean {
    return this._hasFilteredFeed;
  }

  set hasFilteredFeed(value: boolean) {
    this._hasFilteredFeed = value;
  }

  get params(): Params {
    return this._params;
  }

  set params(value: Params) {
    this._params = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
}
