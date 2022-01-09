import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { ProgressBarService } from '../services/ui/progress-bar.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private progressBarService: ProgressBarService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.progressBarService.add()
    return next.handle(request).pipe( finalize(() => this.progressBarService.clear()))
  }
}
