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
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorHandleInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        this.parseError(error)
        return of()
      }),
      tap(
      (response) => {
        if (response instanceof HttpResponse)
          this.parseResponseBody(response)
      },
    ));
  }


  private parseResponseBody(response: any ) {

    let res: Response<any> = response.body;

    const status = res?.status
    
    if (status == false)
      alert(res?.message)

  }

  private parseError(error: any){

    const status = error.status


    if (status === 404) {
      alert('not found')
    }

    if (status >= 500 && status <= 599) {
      alert('سایت با مشکلات فنی دچار شده است , با پشتیبانی تماس بگیرین')

    }
    if (status === 401) {
      this.authService.logOut();
      console.warn('logOut');

      this.router.navigate(['/'])
    }
    if (status === 403) {
      alert('Forbidden')
    }
    if (status === 0) {
      alert('پاسخی وجود ندارد')
    }





  }



}
