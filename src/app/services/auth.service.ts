import {EventEmitter, Injectable, OnDestroy, Output} from '@angular/core';
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Md5} from "ts-md5/dist/md5";
import {IUser} from "../model/IUser";
import {UserService} from "./user.service";
import "rxjs/add/operator/takeWhile";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService implements OnDestroy {

  private userLoggedIn = new Subject<IUser>();

  userLoggedIn$ = this.userLoggedIn.asObservable();

  private storage: Storage = localStorage;

  private redirectUrl: string;

  private loggedUser: IUser;

  private alive: boolean = true;


  constructor (private http: Http, private router: Router, private userService: UserService) {

  }


  login(email: string, password: string): void {
    //.takeWhile(() => this.alive)

    this.userService.getUserByEmail(email).subscribe(user => {
      this.loggedUser = user;
      this.userLoggedIn.next(user);
    });

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

  ngOnDestroy() {
    this.alive = false;
  }

  public getLoggedUser(): Observable<IUser> {
    let email = this.storage.getItem('loggedUser') || "";
    let s: Observable<IUser> = this.userService.getUserByEmail(email);

    s.subscribe(
    user => {
      this.loggedUser = user;
    });

    return s;
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
