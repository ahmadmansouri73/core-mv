import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, take, tap } from 'rxjs';
import { conf } from 'src/conf';
import { Response } from '../interfaces/response';
import { JwtService } from './jwt.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient:  HttpClient,
    private jwtSerivce:  JwtService,
    private userService: UserService,
    private Router: Router
  ) { }


  public readonly auth_kay_name = 'token'
  private subjectAttempAuth = new ReplaySubject<boolean>(1)
  private is_guest: boolean = true
  public  readonly  observableAttempAuth = this.subjectAttempAuth.asObservable()

  public attempAuth(): Observable<Response<any>> {

    if (this.jwtSerivce.cookieCheck(this.auth_kay_name) == false) {
      this.subjectAttempAuth.next(false)
      this.is_guest = true
      let response: Response<null> =
      {
        data: null,
        message: '',
        status: false,
        errors: [],
        code: 200
      }

      return of(response)
    }


    return this.httpClient.get<Response<any>>(conf.baseUrl + 'user').pipe(
      tap(response => {
        if (response.status && response.data.user)
        {
          this.userService.setUser(response.data.user)
          this.is_guest = false
          this.subjectAttempAuth.next(true)
        }
        else
        {
          this.is_guest = true
          this.subjectAttempAuth.next(false)
        }
      })
    );
  }

  public get isLogin(): boolean {
    return this.is_guest == false
  }


  public logOut(): void {
    this.jwtSerivce.cookieDelete(this.auth_kay_name)
    this.userService.cleanUser()
    this.is_guest = true
    this.subjectAttempAuth.next(false)
  }



  public setToken(token: string){
    console.log(token);

    this.jwtSerivce.cookieSet(this.auth_kay_name , token)


  }


}
