import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const auth_kay = this.jwtService.cookieGet('token');


    if (auth_kay != null && auth_kay.toString().trim() != '') {
      request.headers.set('Authorization' , `Bearer ${auth_kay}`)
    }


    return next.handle(request);

  }
}
