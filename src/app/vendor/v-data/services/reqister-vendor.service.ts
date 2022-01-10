import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/core/interfaces/response';
import { conf } from 'src/conf';

@Injectable({
  providedIn: 'root'
})
export class ReqisterVendorService {

  constructor(private httpClient: HttpClient) { }


  register(vendor: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(conf.baseUrl + 'vendor/register' , vendor)
  }


  callNumberConfirm(call_number: string): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(conf.baseUrl + 'vendor/confirm?phone=' + call_number)
  }

}
