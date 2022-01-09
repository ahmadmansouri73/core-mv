import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap,finalize} from 'rxjs/operators';

@Injectable()
export class LogInterceptor implements HttpInterceptor {


  // LogService append log
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    let started = Date.now();
    let ok: string

    return next.handle(request).pipe(
      tap(
        event => {
          ok = event instanceof HttpResponse ? 'success' : ''


        },
        error => ok = 'fail'
      ),
      finalize(() => {
        const elapsed = Date.now() - started;



      })

    );
  }
}
