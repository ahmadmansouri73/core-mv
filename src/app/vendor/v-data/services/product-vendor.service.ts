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



  public one(id: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(conf.baseUrl + 'vendor/api/product?id_product=' + id)
  }


  public update(item: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(conf.baseUrl + 'vendor/api/update-product?id_product=' + item.id_product , {
      VendorUpdateProduct: item
    })
  }


  public append(item: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(conf.baseUrl + 'vendor/api/create-product' , {
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

    return this.httpClient.get<Response<any>>(conf.baseUrl + 'vendor/api/products' + query)
  }

  public active(id: number): Observable<Response<any>>  {
    return this.httpClient.get<Response<any>>(conf.baseUrl + 'vendor/api/active-product?id_product=' + id)
  }


  public not_active(id: number): Observable<Response<any>>   {
    return this.httpClient.get<Response<any>>(conf.baseUrl + 'vendor/api/notactive-product?id_product=' + id)
  }

}
