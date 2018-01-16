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
import {IComment} from "../model/IComment";
import {PostService} from "./post.service";

@Injectable()
export class CommentService {

  private static API_ENDPOINT: string = 'http://localhost:8080/comments';

  private commentEdited = new Subject<IComment[]>();
  commentEdited$ = this.commentEdited.asObservable();


  constructor (private http:HttpClient) { }


  public createPostComment(comment: IComment, postId: number): Observable<IComment[]> {
    let endpoint: string = CommentService.API_ENDPOINT + "/post/" + postId;
    return this.http.post<IComment[]>(endpoint, comment)
      .map(comments => this.modifyComments(comments));
  }

  public modifyComments(comments: IComment[]): IComment[] {
    if(comments == null) {
      return null;
    }

    for(let i = 0; i < comments.length; i++) {
      comments[i] = this.modifyComment(comments[i]);
    }
    return comments;
  }

  public modifyComment(comment: IComment): IComment {
    comment.date = this.modifyCommentDate(new Date(comment.date));

    if(comment.lastModified != null) {
      comment.lastModified = this.modifyCommentDate(new Date(comment.lastModified));
    }

    return comment;
  }

  private modifyCommentDate(date: Date): Date {
    date.setHours(date.getHours() + 1);
    return date;
  }

  public deleteComment(id: number):Observable<IComment[]> {
    let endpoint: string = CommentService.API_ENDPOINT + "/" + id;
    return this.http.delete<IComment[]>(endpoint)
      .map(comments => this.modifyComments(comments));
  }

  public updateComment(comment: IComment): Observable<IComment[]> {
    let endpoint: string = CommentService.API_ENDPOINT + "/" + comment.id;
    return this.http.put<IComment[]>(endpoint, comment)
      .map(comments => {
        comments = this.modifyComments(comments);
        this.commentEdited.next(comments);
        return comments;
      });
  }

}
