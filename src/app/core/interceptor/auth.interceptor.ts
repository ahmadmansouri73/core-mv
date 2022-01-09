import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const auth_kay = '';


    if (auth_kay != null && auth_kay.toString().trim() != '') {
      request.headers.set('Authorization' , `Bearer ${auth_kay}`)
    }


    return next.handle(request);

  }
}
