import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from './interceptor/http-request.interceptor';
import { HttpErrorHandleInterceptor } from './interceptor/http-error-handle.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    {provide: HTTP_INTERCEPTORS , useClass: HttpRequestInterceptor , multi: true },
    {provide: HTTP_INTERCEPTORS , useClass: HttpErrorHandleInterceptor , multi: true}
  ]
})
export class CoreModule { }
