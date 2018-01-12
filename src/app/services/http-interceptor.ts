import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import {appConfig} from "../app.config";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem(appConfig.security.tokenStorageKey) != undefined) {
      return next.handle(req.clone({
        setHeaders: {
          'Authorization': appConfig.security.authorization + ' ' + localStorage.getItem(appConfig.security.tokenStorageKey)
        }
      }));
    } else {
      return next.handle(req);
    }
  }
}
