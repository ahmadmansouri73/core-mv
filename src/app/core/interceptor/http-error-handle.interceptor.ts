import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, of, retry, tap, throwError } from 'rxjs';
import { Response } from '../interfaces/response';

@Injectable()
export class HttpErrorHandleInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(1),
      catchError(error => {
        this.parseError(error)
        return of()
      }),
      tap(
      (response) => this.parseResponseBody(response instanceof HttpResponse),
    ));
  }


  private parseResponseBody(response: any ) {

    let res: Response<any> = response.body;

    const status = res?.status

    if (status === false)
      alert(res?.message)

  }

  private parseError(error: any){

    const status = error.status


    alert(error.message)
    if (status === 404) {

    }

    if (status >= 500 && status <= 599) {
      // alert('سایت با مشکلات فنی دچار شده است , با پشتیبانی تماس بگیرین')

    }
    if (status === 401) {
    }
    if (status === 403) {

    }
    if (status === 0) {
    }





  }



}
