import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class JwtService {


  constructor(private cookieService: CookieService) { }

  public cookieSet(name: string , value: any ): void {
    this.cookieService.set(name , JSON.stringify(value) ,{expires: Date.now() + 3600000*24*14  , path: '/' })
  }

  public cookieGet(name: string): any
  {
    let data = this.cookieService.get(name) ;

    if (data)
      return JSON.parse(data)

    return undefined
  }

  public cookieCheck(name: string): boolean {
    return this.cookieService.check(name)
  }

  public cookieGetAll(): {[kay: string] : string} {
    return this.cookieService.getAll()
  }


  public cookieDelete(name: string): void {
    this.cookieService.delete(name)
  }


  public cookieDeleteAll(): void {
    this.cookieService.deleteAll()
  }

}
