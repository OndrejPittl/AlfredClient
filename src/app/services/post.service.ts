import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {IPost} from "../model/IPost";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/timeout'
import {Subject} from "rxjs/Subject";
import {AuthService} from "./auth.service";
import {Params} from "../model/Params";
import {PostSource} from "../model/PostSource";

@Injectable()
export class PostService {

  // posts loaded
  private postsLoaded = new Subject<IPost[]>();
  postsLoaded$ = this.postsLoaded.asObservable();

  // posts being filtered
  private postFilter = new Subject<IPost[]>();
  postFilter$ = this.postFilter.asObservable();

  private static API_ENDPOINT: string = 'http://localhost:8080/posts';


  constructor(
    private http:HttpClient,
    private authService: AuthService) { }


  public getPost(id: number): Observable<IPost> {
    return this.http.get(PostService.API_ENDPOINT + '/' + id);
  }

  public getPosts(params: Params, offset: number = 0): Observable<IPost[]> {

    let endpoint = PostService.API_ENDPOINT;

    let allowedFilterParams: string[] = [];


    switch (params.postSource) {
      case PostSource.USER:
        endpoint += '/author/' + params.getFilterParam("authorId");
        break;

      case PostSource.USER_RATED:
        endpoint += '/rated';
        break;

      case PostSource.TAG:
        endpoint += '/tag/' + params.getFilterParam("tag");
        break;

      case PostSource.FRIENDS:
        endpoint += '/friends';
        break;

      default:
      case PostSource.GENERAL:
        allowedFilterParams = ['tag', 'rating', 'photo'];
        break;
    }

    // offset – always a subset of all posts
    endpoint += '?offset=' + offset;

    let filterParamQuery: string = '';

    // other params
    for(let item of allowedFilterParams) {
      if(params.hasFilterParam(item)) {
        if(filterParamQuery.length > 0) {
          filterParamQuery += '&';
        }

        filterParamQuery += item + '=' + params.getFilterParam(item);
      }
    }

    // append filter params
    if(filterParamQuery.length > 0) {
      endpoint += '&' + filterParamQuery;
    }

    console.log('endpoint: ' + endpoint);
    return this.http.get(endpoint);

    /*
    return this.http.get(endpoint).map(value => {
      return value.json() || null
    });
    */
  }

  // @TODO: userId
  public getPostsByUser(slug: number): Observable<IPost[]> {
    return this.http.get(PostService.API_ENDPOINT + '?author=' + slug);

    /*
    return this.http.get(PostService.API_ENDPOINT + '?author=' + slug)
      .map(value => {
        return value.json() || {}
    });
    */
  }

  public getPostByTag(tag: string): Observable<IPost[]> {
    return this.http.get(PostService.API_ENDPOINT + '?tags_like=' + tag);

    /*
    return this.http.get(PostService.API_ENDPOINT + '?tags_like=' + tag)
      .map(value => {
        return value.json() || {}
      });
    */
  }

  public createPost(post: IPost): Observable<any> {
    return this.authService.getLoggedUser().map(
      user => {

        //this.authService.setLoggedUser(user);

        let p: IPost = { ...post };
        p.image = "http://via.placeholder.com/1000x1000";
        p.rating = 0;
        p.author = user.slug;
        delete p.id;

        return this.http.post(PostService.API_ENDPOINT, p)
          .subscribe(response => {
            console.log("--- srv response:");
            console.log(response);
          });

        /*
        return this.http.post(PostService.API_ENDPOINT, p)
          .map(response => response.json() || null)
          .subscribe(response => {
            console.log("--- srv response:");
            console.log(response);
          });
        */
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

    /*
    this.http.get(endpoint)
      .map(
        posts => {
          return  posts.json() || {};
        }
      ).subscribe(posts => this.postsLoaded.next(posts) );
      */

    this.http.get(endpoint).subscribe(posts => {
      // TODO: castění
      this.postsLoaded.next(<Array<IPost>> posts)
    });
  }

  private processFilterParamQuery(filter: any): string {
    let query: string = '';

    let params: any = {
      'tag': 'tags_like',
      'rating': 'rating_gte',
      'photo': 'image_like',
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
