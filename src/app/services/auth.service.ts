import {EventEmitter, Injectable, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {IUser} from "../model/IUser";
import {UserService} from "./user.service";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/catch";
import {Subject} from "rxjs/Subject";
import {appConfig} from "../app.config";
import "rxjs/add/observable/of";


@Injectable()
export class AuthService implements OnInit, OnDestroy {

  //private static MD5_SALT: string = "_@lFr3D";
  private static API_ENDPOINT: string = "http://localhost:8080/auth";

  // observable event – user logged in
  private userLoggedIn = new Subject<IUser>();
  userLoggedIn$ = this.userLoggedIn.asObservable();

  private storage: Storage = localStorage;

  private loggedUser: IUser;

  private alive: boolean = true;



  constructor (
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requestUser().subscribe(user => {
      this.loggedUser = <IUser> user;
    });
  }

  public auth(email: string, password: string): Observable<IUser> {
    return this.authUser(email, password)
      .map(user => {
        this.loggedUser = { ...user };
        this.loggedUser['password'] = '';
        this.loggedUser['confirmPassword'] = '';

        this.storage.setItem(appConfig.security.tokenStorageKey, user.token);
        this.userLoggedIn.next(this.loggedUser);

        console.log("AuthService – Authenticated:");
        console.log(this.loggedUser);
        return user;
      });
  }

  public getLoggedUser(): Observable<IUser> {
    console.log("–––> AuthService – Getting logged user:");
    console.log(this.loggedUser);

    if(this.isLoggedUserStored()) {
      console.log("   > AuthService – Logged user stored via AuthService:");
      console.log(this.loggedUser);
      return Observable.of(this.loggedUser);
    }

    return this.requestUser().map(user => {
      this.loggedUser = user;
      return user;
    });
  }

  private requestUser(): Observable<IUser> {
    console.log("   > AuthService – AuthService has no logged user stored. Connecting server...");

    return this.http.get(AuthService.API_ENDPOINT + '/me')
      .catch(() => {
        this.kickoff();
        return Observable.of([]);
      });
  }

  private isLoggedUserStored(): boolean {
    return this.loggedUser !== undefined;
  }

  private authUser(email: string, password: string): Observable<IUser> {
    let u = <IUser>{};
    u['email'] = email;
    u['password'] = password;
    return this.http.post(AuthService.API_ENDPOINT, u);
  }

  public isLoggedIn(): boolean {
    return !!this.storage.getItem(appConfig.security.tokenStorageKey);
  }

  public logout() {
    this.http.post(AuthService.API_ENDPOINT + '/logout', null);
    this.kickoff();
  }

  public kickoff(): void {
    this.storage.removeItem(appConfig.security.tokenStorageKey);
    this.router.navigate(['welcome']);
  }

  public ngOnDestroy() {
    this.alive = false;
  }
}
