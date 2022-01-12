import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtService , private AuthService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const auth_kay = this.jwtService.cookieGet(this.AuthService.auth_kay_name);


    if (auth_kay != null && auth_kay.toString().trim() != '') {
      request.headers.set('Authorization' , `Bearer ${auth_kay}`)
    }


    return next.handle(request);

  }
}
