import { NotifyService } from './../services/ui/notify.service';
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

  constructor(
    private notify: NotifyService,
    private authService: AuthService,
    private router: Router) {}

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
      this.notify.warning(res?.message)

  }

  private parseError(error: any){

    const status = error.status


    if (status === 404) {
      this.notify.warning('not found')
    }

    if (status >= 500 && status <= 599) {
      this.notify.error('سایت با مشکلات فنی دچار شده است , با پشتیبانی تماس بگیرین')

    }
    if (status === 401) {
      this.authService.logOut();
      this.notify.error('forbidden system , logout');
      this.router.navigate(['/'])

    }
    if (status === 403) {
      this.notify.error('Forbidden')
    }
    if (status === 0) {
      this.notify.warning('پاسخی وجود ندارد')
    }





  }



}
