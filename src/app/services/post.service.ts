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
import {CommentService} from "./comment.service";
import {IUser} from "../model/IUser";

@Injectable()
export class PostService {

  // posts loaded
  private postsLoaded = new Subject<IPost[]>();
  postsLoaded$ = this.postsLoaded.asObservable();

  // posts being filtered
  private postFilter = new Subject<IPost[]>();
  postFilter$ = this.postFilter.asObservable();

  private modalOpened = new Subject<IPost>();
  modalOpened$ = this.modalOpened.asObservable();

  /*
  private postsUpdated = new Subject<IPost[]>();
  postsUpdated$ = this.postsUpdated.asObservable();
  */


  private static API_ENDPOINT: string = 'http://localhost:8080/posts';

  private user: IUser = {} as IUser;



  constructor(
    private http:HttpClient,
    private authService: AuthService,
    private commentService: CommentService) {}


  public getPost(id: number): Observable<IPost> {
    return this.http.get(PostService.API_ENDPOINT + '/' + id)
      .map((post:IPost) => this.modifyPost(post));
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
    return this.http.get<IPost[]>(endpoint)
      .map(posts => this.modifyPosts(posts));

    /*
    return this.http.get(endpoint).map(value => {
      return value.json() || null
    });
    */
  }

  /*
  // @TODO: userId
  public getPostsByUser(slug: number): Observable<IPost[]> {
    return this.http.get<IPost[]>(PostService.API_ENDPOINT + '?author=' + slug)
      .map(posts => this.modifyPosts(posts));
  }

  public getPostByTag(tag: string): Observable<IPost[]> {
    return this.http.get<IPost[]>(PostService.API_ENDPOINT + '?tags_like=' + tag)
      .map(posts => this.modifyPosts(posts));
  }
  */

  public createPost(post: IPost): Observable<IPost[]> {
    let p: IPost = { ...post };
    p.image = "http://via.placeholder.com/1000x1000";
    return this.http.post<IPost[]>(PostService.API_ENDPOINT, p)
      .map(posts => {
        this.postsLoaded.next(posts);
        return posts;
      });
  }

  public updatePost(post: IPost): Observable<IPost> {
    let p: IPost = { ...post };

    let endpoint: string = PostService.API_ENDPOINT + '/' + post.id;

    p.image = "http://via.placeholder.com/1000x1000";

    return this.http.put<IPost>(endpoint, p)
      .map(post => {
        let posts: IPost[] = [post];
        this.postsLoaded.next(posts);
        return post;
      })
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

  public modifyPosts(posts: IPost[]):IPost[] {
    for(let i = 0; i < posts.length; i++) {
      posts[i] = this.modifyPost(posts[i]);
    }
    return posts;
  }

  public modifyPost(post: IPost): IPost {
    post.date = this.modifyPostDate(new Date(post.date));

    if(post.lastModified != null) {
      post.lastModified = this.modifyPostDate(new Date(post.lastModified));
    }

    post.comments = this.commentService.modifyComments(post.comments);


    /*
    if(post.rating != null && post.rating.length > 0) {
      for(let r: number = 0; r < post.rating.length; r++) {
        if(post.rating[r] == this.user.id) {
          post.userRated = true;
          break;
        }
      }
    }
    */


    return post;
  }

  private modifyPostDate(date: Date): Date {
    date.setHours(date.getHours() + 1);
    return date;
  }

  public updatePostsRated(posts: IPost[], uid: number): IPost[] {
      for(let i: number = 0; i < posts.length; i++) {
        this.updatePostRated(posts[i], uid);
      }

      return posts;
  }

  public updatePostRated(post: IPost, uid: number): IPost {
    post.userRated = post.rating.indexOf(uid) >= 0;
    return post;
  }

  public registerEditing(post: IPost): void {
    this.modalOpened.next(post);
  }

  public registerNewPostModal(): void {
    console.log("POST EDIT STOP REGISTERED");
    this.modalOpened.next(null);
  }

  public deletePost(postId: number): Observable<IPost[]> {
    let endpoint: string = PostService.API_ENDPOINT + '/' + postId;
    return this.http.delete<IPost[]>(endpoint)
      .map((posts: IPost[]) => {
        this.postsLoaded.next(posts);
        return posts;
      });
  }
}
