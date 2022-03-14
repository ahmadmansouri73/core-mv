import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { conf } from 'src/conf';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private httpClient: HttpClient) { }


  reset_password(item: {old_password: string , new_password: string}): Observable<any> {
    return this.httpClient.post(conf.baseUrl + 'vendor/api/reset-password', item)
  }
}
