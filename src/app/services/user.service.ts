import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import {IUser} from "../model/IUser";
//import { Http } from "@angular/http";
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map'
import {AuthService} from "./auth.service";
import {Subject} from "rxjs/Subject";


@Injectable()
export class UserService {


  private static API_ENDPOINT: string = "http://localhost:8080/users";


  private userUpdated = new Subject<IUser>();
  userUpdated$ = this.userUpdated.asObservable();



  constructor(private http:HttpClient) { }

  /**
   * Profile page of a user.
   *
   * @param {string} slu              Slug got from url.
   * @returns {Observable<IUser[]>}   Observable resource of users.
   */
  public getUserBySlug(slug: string): Observable<IUser> {
    return this.http.get<IUser>(UserService.API_ENDPOINT + '/slug/' + slug);

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
    return this.http.post<IUser>(UserService.API_ENDPOINT, user);
  }

  public sendFriendship(userId: number): Observable<IUser> {
    let endpoint: string = UserService.API_ENDPOINT + '/' + userId + '/friendship';
    return this.http.post<IUser>(endpoint, null);
  }

  public approveFriendship(userId: number): Observable<IUser> {
    let endpoint: string = UserService.API_ENDPOINT + '/' + userId + '/friendship';
    return this.http.put<IUser>(endpoint, null);
  }

  public cancelFriendship(userId: number): Observable<IUser> {
    let endpoint: string = UserService.API_ENDPOINT + '/' + userId + '/friendship';
    return this.http.delete<IUser>(endpoint);
  }

  public updateUser(user: IUser): Observable<IUser> {
    let endpoint: string = UserService.API_ENDPOINT;
    return this.http.put<IUser>(endpoint, user);
  }

  public updateLoggedUser(user: IUser) {
    this.userUpdated.next(user);
  }


  /*
  public modifyUsers(users: IUser[]):IUser[] {
    for(let i = 0; i < users.length; i++) {
      users[i] = this.modifyUser(users[i]);
    }
    return users;
  }

  public modifyUser(user: IUser): IUser {
    user.birth = this.modifyUserDate(new Date(user.birth));
    return user;
  }

  private modifyUserDate(date: Date): Date {
    date.setHours(date.getHours() + 1);
    return date;
  }
  */
}
