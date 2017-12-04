import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IPost } from "../model/IPost";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/timeout'
import {Subject} from "rxjs/Subject";
import {appConfig} from "../app.config";
import {AuthService} from "./auth.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class PostService {

  // posts loaded
  private postsLoaded = new Subject<IPost[]>();
  postsLoaded$ = this.postsLoaded.asObservable();

  // posts filtering
  private postFilter = new Subject<IPost[]>();
  postFilter$ = this.postFilter.asObservable();

  private static API_ENDPOINT: string = 'http://localhost:3000/posts';


  constructor(private http:Http, private authService: AuthService) { }


  public getPost(id: number): Observable<IPost> {
    return this.http.get(PostService.API_ENDPOINT + '/' + id)
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

    let endpoint = PostService.API_ENDPOINT + '?' + p + '&_page=' + page + '&_limit=' + limit + '&_sort=id&_order=desc';
    console.log(endpoint);

    //.timeout(3000, new Error('timeout exceeded'))
    return this.http.get(endpoint).map(value => {
        return value.json() || null
      });
  }


  // @TODO: userId
  public getPostsByUser(slug: number): Observable<IPost[]> {
    return this.http.get(PostService.API_ENDPOINT + '?author=' + slug)
      .map(value => {
        return value.json() || {}
    });
  }

  public getPostByTag(tag: string): Observable<IPost[]> {
    return this.http.get(PostService.API_ENDPOINT + '?tags_like=' + tag)
      .map(value => {
        return value.json() || {}
      });
  }

  public createPost(post: IPost): Observable<any> {
    return this.authService.getLoggedUser().map(
      user => {
        let p: IPost = { ...post };
        p.image = "http://via.placeholder.com/1000x1000";
        p.rating = 0;
        p.author = user.slug;
        delete p.id;

        return this.http.post(PostService.API_ENDPOINT, p)
          .map(response => response.json() || null)
          .subscribe(response => {
            console.log("--- srv response:");
            console.log(response);
          });
      }
    );
  }

  public registerFiltering(filter: any) {
    this.postFilter.next(filter);
  }

  public filterPosts(filter: any): void {
    let endpoint: string = PostService.API_ENDPOINT;

    if(filter !== null) {
      endpoint += '?' + this.processFilterParamQuery(filter) + '&_sort=id&_order=desc';
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
