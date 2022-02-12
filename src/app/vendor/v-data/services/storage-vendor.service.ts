import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/core/interfaces/response';
import { conf } from 'src/conf';

@Injectable({
  providedIn: 'root'
})
export class StorageVendorService {

  constructor(private httpClient: HttpClient) { }



  one(id: any): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(conf.baseUrl +  'vendor/api/storage?id=' + id)
  }

  append(item: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(conf.baseUrl + 'vendor/api/append-storage' , {
      VendorStorage: item
    })
  }

  update(item: any): Observable<Response<any>>{
    return this.httpClient.post<Response<any>>(conf.baseUrl + 'vendor/api/update-storage?id=' + item.id_vendor_storage , item)
  }

  storages(): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(conf.baseUrl + 'vendor/api/storages');
  }

  active(id: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(conf.baseUrl + 'vendor/api/active-storage?id=' + id);
  }


  not_active(id: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(conf.baseUrl + 'vendor/api/notactive-storage?id=' + id);
  }

}
