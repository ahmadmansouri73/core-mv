import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  constructor() { }
  private subjectType = new ReplaySubject<any>(1)
  private _type: any = null
  public readonly observableType = this.subjectType.asObservable()


  public static readonly VENDOR = 1
  public static readonly BUYER = 2
  public static readonly ADMIN = 3
  public static readonly FARMER = 4


  public setType(item: any): void {
    this.subjectType.next(item)
    this._type = item
  }

  public clearType(): void {
    this.subjectType.next(null)
    this._type = null
  }


  public getType() {
    return this._type
  }
}
