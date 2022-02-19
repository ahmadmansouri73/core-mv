import { conf } from './../../../../conf';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from 'src/app/core/interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  constructor(private httpClient: HttpClient) { }

  private readonly url: string = conf.baseUrl + 'farmer/';


  public connection_farmer(item: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(this.url + 'api/connection-farmer' , item)
  }

  public checking_exist_farmer(call_number: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(this.url + 'api/checking-exist-farmer?call_number=' + call_number)
  }

  public connections(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(this.url + 'api/connections')
  }

  public append_tag(item: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(this.url + 'api/append-tag' , item)
  }

  public remove_connection(id: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(this.url + 'api/remove-connection?id=' + id)
  }

}
