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

  private static MD5_SALT: string = "_@lFr3D";

  // observable event – user logged in
  private userLoggedIn = new Subject<IUser>();
  userLoggedIn$ = this.userLoggedIn.asObservable();

  private storage: Storage = localStorage;

  private loggedUser: IUser;

  private alive: boolean = true;



  constructor (
    private http: Http,
    private router: Router,
    private userService: UserService
  ) {}



  authenticate(email: string, password: string): boolean {
    let hash: string = AuthService.hashPassword(password);

    console.log(email + " logging in...");

    this.userService.authUser(email, hash).subscribe(user => {

      if(!user) {
        console.log("ERROR: No user with " + email + " was found.");
        console.log(user);
        return false;
      } else {
        console.log("User with " + email + " found: ");
        console.log(user);
      }

      this.loggedUser = { ...user };

      // ----------------------------------------
      // @TODO: odebrat, server nebude posílat
      this.loggedUser['password'] = '';
      this.loggedUser['confirmPassword'] = '';
      // ----------------------------------------

      this.storage.setItem('token', user.token);


      console.log("User logged, pinging observers:");
      console.log(this.loggedUser);
      this.userLoggedIn.next(this.loggedUser);

      this.router.navigate(['discover']);
      return true;
    });

    return false;
  }

  public static hashPassword(pwd: string): string {
    return Md5.hashStr(pwd + AuthService.MD5_SALT).toString();
  }

  /**
   * Kontrola tokenu na SRV?
   * @returns {boolean}
   */
  public isLoggedIn(): boolean {
    return !!this.storage.getItem('token');
  }

  public logout() {
    this.storage.removeItem('token');
    this.router.navigate(['welcome']);
  }

  public getLoggedUser(): Observable<IUser> {
    let token = this.storage.getItem('token') || "";
    return this.userService.getUserByToken(token);
  }

  public ngOnDestroy() {
    this.alive = false;
  }

}
