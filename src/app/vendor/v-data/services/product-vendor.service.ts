import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/core/interfaces/response';
import { conf } from 'src/conf';

@Injectable({
  providedIn: 'root'
})
export class ProductVendorService {

  constructor(private httpClient: HttpClient) {}






  public apend(item: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(conf.baseUrl + 'vendor/create-product' , {
      VendorCreatedProduct: item
    })
  }


  public search(filter: any = {}): Observable<Response<any>> {
    let query = '?'
    for (let data in filter) {
      if (filter[data] != null && filter[data].toString().trim() != '') {
        query += `${data}=${filter[data]}&`
      }
    }

    query =  query.replace(/[&,?]$/,"")

    return this.httpClient.get<Response<any>>(conf.baseUrl + 'vendor/products' + query)
  }

  public active(id: number): Observable<Response<any>>  {
    return this.httpClient.get<Response<any>>(conf.baseUrl + 'vendor/active-product?id=' + id)
  }


  public not_active(id: number): Observable<Response<any>>   {
    return this.httpClient.get<Response<any>>(conf.baseUrl + 'vendor/notactive-product?id=' + id)
  }

}
