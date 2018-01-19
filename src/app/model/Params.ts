import {PostSource} from "./PostSource";

export class Params {

  private _postSource: PostSource;

  private _filterParams: any;


  constructor() {
    this._postSource = PostSource.GENERAL;
    this._filterParams = {};
  }

  get postSource(): PostSource {
    return this._postSource;
  }

  set postSource(value: PostSource) {
    this._postSource = value;
  }

  get filterParams(): any[] {
    return this._filterParams;
  }

  set filterParams(value: any[]) {
    this._filterParams = value;
  }

  public addFilterParam(key: string, value: any): void {
    this._filterParams[key] = value;
  }

  public getFilterParam(key: string): any {
    return this._filterParams[key];
  }

  public hasFilterParam(key: string): boolean {
    return this._filterParams[key] !== undefined
      && this._filterParams[key] !== null
      && (this._filterParams[key].length > 0 || typeof this._filterParams[key] === "boolean");
  }

  public getFilterParamQuery(startChar: string = '?'): string {
    let q: string = startChar;
    let len: number = this._filterParams.length;

    for(let key in this._filterParams) {
      q += key + '=' + this._filterParams[key];
      if(--len > 0) q += '&';
    }

    return q;
  }
}
