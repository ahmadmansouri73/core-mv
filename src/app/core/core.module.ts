import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpRequestInterceptor} from './interceptor/http-request.interceptor';
import {HttpErrorHandleInterceptor} from './interceptor/http-error-handle.interceptor';
import {CookieService} from 'ngx-cookie-service';
import {AuthInterceptor} from './interceptor/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [],
  imports: [

    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      progressBar: false,
      closeButton: true
    })
  ],
  providers: [
    CookieService,
    {provide: HTTP_INTERCEPTORS , useClass: HttpRequestInterceptor , multi: true },
    {provide: HTTP_INTERCEPTORS , useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS , useClass: HttpErrorHandleInterceptor , multi: true}
  ]
})
export class CoreModule { }
