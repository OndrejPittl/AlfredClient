import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {IUser} from "../model/IUser";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/catch";
import {Subject} from "rxjs/Subject";
import {appConfig} from "../app.config";
import "rxjs/add/observable/of";


@Injectable()
export class AuthService implements OnInit, OnDestroy {

  private static API_ENDPOINT: string = "http://localhost:8080/auth";

  private alive: boolean = true;

  // observable event – user logged in
  private userLoggedIn = new Subject<IUser>();
  userLoggedIn$ = this.userLoggedIn.asObservable();

  private userLoggedOut = new Subject();
  userLoggedOut$ = this.userLoggedOut.asObservable();

  private storage: Storage = localStorage;

  private user: IUser = null;         // instance of logged user
  private userLogged: boolean;        // is user logged flag
  private token: string = "";         // token



  constructor (
    private http: HttpClient,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.userLogged = false;

    this.getLoggedUser()
      .takeWhile(() => this.alive)
      .subscribe(user => {
      this.user = <IUser> user;
      this.userLogged = true;
    }, err => {
      this.resetUser();
    });
  }

  public auth(email: string, password: string): Observable<IUser> {
    return this.authUser(email, password)
      .map(user => {
        this.user = { ...user };
        this.user['password'] = '';
        this.user['confirmPassword'] = '';

        this.userLogged = true;
        this.token = user.token;
        this.storage.setItem(appConfig.security.tokenStorageKey, user.token);

        this.userLoggedIn.next(this.user);

        console.log("AuthService – Authenticated:");
        console.log(this.user);
        return user;
      });
  }

  private authUser(email: string, password: string): Observable<IUser> {
    let u = <IUser>{};
    u['email'] = email;
    u['password'] = password;
    return this.http.post(AuthService.API_ENDPOINT, u);
  }

  public getLoggedUser(update: boolean = false): Observable<IUser> {
    console.log("–––> AuthService");

    if(this.isLoggedUserStored() && !update) {
      console.log("   > AuthService – Logged User stored via AuthService:");
      console.log(this.user);
      return Observable.of(this.user);
    }

    return this.requestUser().map(user => {
      console.log("   > AuthService – Logged User info got from server.");
      console.log(user);

      this.user = user;
      this.userLogged = true;

      return user;
    });
  }

  private requestUser(): Observable<IUser> {
    console.log("   > AuthService – AuthService has no logged user stored. Connecting server...");

    return this.http.get(AuthService.API_ENDPOINT + '/me')
      .catch(() => {
        this.resetUser();
        return Observable.of(null);
      });
  }

  private isLoggedUserStored(): boolean {
    return this.userLogged && this.user !== null && this.user !== undefined;
  }

  public isLoggedIn(): boolean {
    return !!this.storage.getItem(appConfig.security.tokenStorageKey);
  }

  private resetUser(): void {
    this.user = null;
    this.userLogged = false;
  }

  public logout() {
    this.http.post(AuthService.API_ENDPOINT + '/logout', null);
    this.userLoggedOut.next();
    this.resetUser();
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
