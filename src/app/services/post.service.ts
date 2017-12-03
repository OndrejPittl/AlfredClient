import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IPost } from "../model/IPost";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'
import {Subject} from "rxjs/Subject";
import {appConfig} from "../app.config";

@Injectable()
export class PostService {

  private postsLoaded = new Subject<IPost[]>();
  postsLoaded$ = this.postsLoaded.asObservable();

  private postApiEdnpoint: string = 'http://localhost:3000/posts';


  constructor(private http:Http) { }


  public getPost(id: number): Observable<IPost[]> {
    return this.http.get(this.postApiEdnpoint + '/' + id)
      .map(value => {
        return value.json() || {}
      });
  }

  public getAllPosts(
    params: any = {},
    page: number = 1,
    limit: number = appConfig.feed.limit): Observable<IPost[]> {


    let p = this.processFilterParamQuery(params);

    console.log(p);

    let endpoint = this.postApiEdnpoint + '?' + p + '&_page=' + page + '&_limit=' + limit;

    console.log(endpoint);

    return this.http.get(endpoint)
      .map(value => {
        return value.json() || {}
      });
  }


  // @TODO: userId
  public getPostsByUser(slug: number): Observable<IPost[]> {
    return this.http.get(this.postApiEdnpoint + '?author=' + slug)
      .map(value => {
        return value.json() || {}
    });
  }

  public getPostByTag(tag: string): Observable<IPost[]> {
    return this.http.get(this.postApiEdnpoint + '?tags_like=' + tag)
      .map(value => {
        return value.json() || {}
      });
  }

  public filterPosts(filter: any): void {
    let endpoint: string = this.postApiEdnpoint;

    if(filter !== null) {
      endpoint += '?' + this.processFilterParamQuery(filter);
    }

    console.log(endpoint);

    this.http.get(endpoint)
      .map(
        posts => {
          return  posts.json() || {};
        }
      ).subscribe(posts => this.postsLoaded.next(posts) );
  }

  private processFilterParamQuery(filter: any): string {
    let query: string = '';

    let params: any = {
      'tag': 'tags_like',
      'rating': 'rating_gte',
      'photo': 'images_like',
      'author': 'author_like'
    };

    let i: number = 0;
    for (let key in filter) {
      let val = filter[key];

      if(key == 'photo') {
        if(val == true) {
          if(i > 0) query += "&";
          query += params[key] + '=' + 'asset';
        }
        continue;
      }

      if(val == null) continue;
      if(i > 0) query += "&";

      query += params[key] + '=' + val;

      i++;
    }
    return query;
  }

}
