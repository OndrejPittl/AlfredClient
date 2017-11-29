import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Params,
  ActivatedRoute
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  //private storage: Storage = localStorage;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.authService.storeRedirectUrl(state.url);
    this.router.navigate(['welcome']);
    return false;
  }

  /* canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.storage.getItem('loggedUser')) { return true }
    this.router.navigate( ['welcome'], { queryParams: { url: state.url } } );
    return false;
  } */
}
