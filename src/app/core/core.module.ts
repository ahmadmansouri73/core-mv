import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpRequestInterceptor} from './interceptor/http-request.interceptor';
import {HttpErrorHandleInterceptor} from './interceptor/http-error-handle.interceptor';
import {CookieService} from 'ngx-cookie-service';
import {AuthInterceptor} from './interceptor/auth.interceptor';
import {
  DARK_THEME,
  DEFAULT_THEME,
  NB_MEDIA_BREAKPOINTS,
  NbLayoutDirection,
  NbLayoutModule, NbSidebarModule,
  NbThemeModule
} from "@nebular/theme";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'dark'} , [DEFAULT_THEME , DARK_THEME] ,[] ,NbLayoutDirection.RTL),
    NbSidebarModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,

  ],
  providers: [
    CookieService,
    {provide: HTTP_INTERCEPTORS , useClass: HttpRequestInterceptor , multi: true },
    {provide: HTTP_INTERCEPTORS , useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS , useClass: HttpErrorHandleInterceptor , multi: true}
  ]
})
export class CoreModule { }
