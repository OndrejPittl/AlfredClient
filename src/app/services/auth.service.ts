import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Md5} from "ts-md5/dist/md5";
import {IUser} from "../model/IUser";

@Injectable()
export class AuthService {

  private storage: Storage = localStorage;

  //public isLoggedIn: boolean = false;

  private redirectUrl: string;


  constructor (private http: Http, private router: Router) { }


  login(email: string, password: string): void {
    this.storage.setItem('loggedUser', email);
    this.router.navigate([this.redirectUrl || 'discover']);
    this.redirectUrl = null;
  }

  storeRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  isLoggedIn(): boolean {
    if(this.storage.getItem('loggedUser')) return true;
    return false;
  }

  logout() {
    this.storage.removeItem('loggedUser');
    this.router.navigate(['welcome']);
  }

  /*
  login(email, password): Observable<boolean> {
    let pwd = Md5.hashStr(password);
    const user = { email, pwd };

    //return this.http.post('api/login', JSON.stringify(user)).map((res: Response) => {
    return this.http.post('api/login', body)
      .map(value => {
        this.isLoggedIn = true;

        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl]);
          this.redirectUrl = null;
        }
    });

    return this.http.get('http://localhost:3000/posts?user_id=' + userId)
      .map(value => {
        return value.json() || {}
      });
  }
  */


}
