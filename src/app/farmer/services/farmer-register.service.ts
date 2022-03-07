import { AuthService } from 'src/app/core/services/auth.service';
import { Observable, tap, filter, switchMap } from 'rxjs';
import { conf } from 'src/conf';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from 'src/app/core/interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class FarmerRegisterService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  confirm_code(call_number: number  , code: number): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(conf.baseUrl + 'farmer/auth/register' , {
      call_number: call_number,
      code: code
    })
    .pipe(tap((response: Response<any>) => {
      if (response.status == true) {
        this.authService.setToken(response.data.token)
      }
    }) , filter(next => next.status == true) , switchMap(_ => this.authService.attempAuth()))
  }

  register_phone(call_number: string): Observable<any> {
    return this.httpClient.get(conf.baseUrl + 'farmer/auth/confirm?call_number=' + call_number)
  }




}
