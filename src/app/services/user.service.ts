import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import {IUser} from "../model/IUser";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'


@Injectable()
export class UserService {

  constructor(private http:Http) {

  }

  public getUser(slug: string): Observable<IUser[]> {
    return this.http.get('http://localhost:3000/users?slug=' + slug)
      .map(value => {
        return value.json()[0] || {}
      });
  }




}
