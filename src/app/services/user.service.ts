import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import {IUser} from "../model/IUser";
//import { Http } from "@angular/http";
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map'
import {AuthService} from "./auth.service";


@Injectable()
export class UserService {


  private static API_ENDPOINT: string = "http://localhost:8080/users";



  constructor(private http:HttpClient) { }

  /**
   * Profile page of a user.
   *
   * @param {string} slu              Slug got from url.
   * @returns {Observable<IUser[]>}   Observable resource of users.
   */
  public getUserBySlug(slug: string): Observable<IUser[]> {
    return this.http.get(UserService.API_ENDPOINT + '?slug=' + slug);

    /*
    return this.http.get(UserService.API_ENDPOINT + '?slug=' + slug)
      .map(response => response.json()[0] || {});
    */
  }

  /*
  public getUserByEmail(email: string): Observable<IUser> {
    return this.http.get(UserService.API_ENDPOINT + '?email=' + email)
      .map(response => response.json()[0] || {});
  }
  */


  /*
  public authUser(email: string, pwdHash: string): Observable<IUser> {
    let endpoint = UserService.API_ENDPOINT + '?email=' + email + '&password=' + pwdHash;
    return this.http.get(endpoint).map(response => response.json()[0] || null);
  }
  */

  public createUser(user: any): Observable<IUser> {
    let u = { ...user };
    u['photo'] = "http://via.placeholder.com/1000x1000";
    //u['slug'] = (u['firstName'] + "-" + u['lastName']).toLowerCase();
    //u[appConfig.security.tokenStorageKey] = "simpleToken" + '-' + u['slug'];
    //u['password'] = AuthService.hashPassword(u['password']);
    //return this.http.post(UserService.API_ENDPOINT, u).map(response => response.json() || null);
    return this.http.post(UserService.API_ENDPOINT, u);
  }
}
