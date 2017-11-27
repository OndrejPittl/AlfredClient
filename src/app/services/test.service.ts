import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Test} from "../interfaces/test";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map'

@Injectable()
export class TestService {


  constructor(private http:Http) {

  }

  getTestData() : Observable<Test[]> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
      .map(value => {
        return value.json() || {}
      });
  }
}
