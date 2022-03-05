import { Observable } from 'rxjs';
import { conf } from 'src/conf';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from 'src/app/core/interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class FarmerProfileService {

  constructor(
    private httpClient: HttpClient
  ) { }

  update(item: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(conf.baseUrl + 'farmer/auth/profile', item)
  }

  
}
