import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IPost } from "../model/IPost";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'

@Injectable()
export class PostService {

  constructor(private http:Http) {

  }

  public getAllPosts(): Observable<IPost[]> {
    return this.http.get('http://localhost:3000/posts')
      .map(value => {
        return value.json() || {}
      });
  }

  public getPosts(userId: number): Observable<IPost[]> {
    return this.http.get('http://localhost:3000/posts?user_id=' + userId)
      .map(value => {
        return value.json() || {}
      });
  }

  public getPost(id: number): Observable<IPost[]> {
    return this.http.get('http://localhost:3000/posts/' + id)
      .map(value => {
        return value.json() || {}
      });
  }




}
