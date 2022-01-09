import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, take, tap } from 'rxjs';
import { conf } from 'src/conf';
import { Response } from '../interfaces/response';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  private subjectAttempAuth = new ReplaySubject<boolean>(1)
  private is_guest: boolean = true
  public readonly observableAttempAuth = this.subjectAttempAuth.asObservable()

  public attempAuth(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(conf.baseUrl + 'user/confirm').pipe(
      tap(response => {
        if (response.status && response.data.user)
        {
          this.userService.setUser(response.data.user)
          this.subjectAttempAuth.next(true)
          this.is_guest = false
        }
        else
        {
          this.subjectAttempAuth.next(false)
        }
      },
      take(1))
    );
  }

  public isLogin(): boolean {
    return this.is_guest == false
  }


  public logOut(): void {
    this.subjectAttempAuth.next(false);
    this.userService.cleanUser()
    this.is_guest = true
  }



}
