import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {IPost} from "../model/IPost";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/timeout'
import {PostService} from "./post.service";

@Injectable()
export class RatingService {

  private static API_ENDPOINT: string = 'http://localhost:8080/posts';

  /*
  private commentEdited = new Subject<IComment[]>();
  commentEdited$ = this.commentEdited.asObservable();
  */

  constructor (private http:HttpClient, private postService: PostService) { }


  public ratePost(postId: number): Observable<IPost> {
    let endpoint: string = RatingService.API_ENDPOINT + "/" + postId + "/rating";
    return this.http.post<IPost>(endpoint, null)
      .map(post => this.postService.modifyPost(post));
  }

  public unratePost(postId: number):Observable<IPost> {
    let endpoint: string = RatingService.API_ENDPOINT + "/" + postId + "/rating";
    return this.http.delete<IPost>(endpoint)
      .map(post => this.postService.modifyPost(post));
  }

  public togglePostRating(postId: number, hasUserRated: boolean):Observable<IPost> {
    if(hasUserRated) {
      console.log("------>>>> removing rating " + hasUserRated);
      return this.unratePost(postId);
    } else {
      console.log("------>>>> sending new rating " + hasUserRated);
      return this.ratePost(postId);
    }
  }
}
