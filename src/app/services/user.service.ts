import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import {IUser} from "../model/IUser";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'
import {AuthService} from "./auth.service";


@Injectable()
export class UserService {


  private static API_ENDPOINT: string = "http://localhost:3000/users";



  constructor(private http:Http) { }

  /**
   * Profile page of a user.
   *
   * @param {string} slu              Slug got from url.
   * @returns {Observable<IUser[]>}   Observable resource of users.
   */
  public getUserBySlug(slug: string): Observable<IUser[]> {
    return this.http.get(UserService.API_ENDPOINT + '?slug=' + slug)
      .map(response => response.json()[0] || {});
  }

  public getUserByEmail(email: string): Observable<IUser> {
    return this.http.get(UserService.API_ENDPOINT + '?email=' + email)
      .map(response => response.json()[0] || {});
  }

  public getUserByToken(token: string): Observable<IUser> {
    return this.http.get(UserService.API_ENDPOINT + '?token=' + token)
      .map(response => response.json()[0] || {});
  }

  public authUser(email: string, pwdHash: string): Observable<IUser> {
    let endpoint = UserService.API_ENDPOINT + '?email=' + email + '&password=' + pwdHash;
    return this.http.get(endpoint).map(response => response.json()[0] || null);
  }

  public addUser(user: any): Observable<any> {
    let u = { ...user };
    u['photo'] = "http://via.placeholder.com/1000x1000";
    u['slug'] = (u['firstName'] + "-" + u['lastName']).toLowerCase();
    u['token'] = "simpleToken" + '-' + u['slug'];
    u['password'] = AuthService.hashPassword(u['password']);
    u['confirmPassword'] = AuthService.hashPassword(u['password']);
    return this.http.post(UserService.API_ENDPOINT, u).map(response => response.json() || null);
  }
}
