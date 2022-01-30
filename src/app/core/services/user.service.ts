import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private subjectUser = new ReplaySubject<any>(1)
  private _user: any = null
  public readonly observableUser = this.subjectUser.asObservable()

  public setUser(user: any) {
    this.subjectUser.next(user)
    this._user = user
  }

  public cleanUser(){
    this._user = null
    this.subjectUser.next(null)
  }

  public get user(): any {
    return this._user;
  }
}
