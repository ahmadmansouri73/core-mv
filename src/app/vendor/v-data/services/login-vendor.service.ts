import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { Response } from 'src/app/core/interfaces/response';
import { AuthService } from 'src/app/core/services/auth.service';
import { conf } from 'src/conf';

@Injectable({
  providedIn: 'root'
})
export class LoginVendorService {

  constructor(private httpClient: HttpClient,private authService: AuthService) { }

  login(data: {username: string , password: string}): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(conf.baseUrl + 'vendor/login' , data)
      .pipe(tap(response => {
        if (response.status == true) {
          this.authService.setToken(response.data.token)
        }
      }))
  }
}
