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


  farmers(): Observable<any>
  {
    return this.httpClient.get(this.url + 'this/all')
  }

  one(id: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(this.url + 'this/one?id=' + id)
  }

  created(item: any): Observable<Response<any>> {
    return this.httpClient.post<Response<any>>(this.url + 'this/created' , {
      Farmer: item
    })
  }

  name_search(name: string ) {
    // let query = '?'
    // for (let data in filter) {
    //   if (filter[data] != null && filter[data].toString().trim() != '') {
    //     query += `${data}=${filter[data]}&`
    //   }
    // }
    // query =  query.replace(/[&,?]$/,"")

    return this.httpClient.get<Response<any>>(this.url + 'this/name-search?name=' + name)
  }

  active(id: number): Observable<Response<any>>  {
    return this.httpClient.get<Response<any>>(this.url + 'this/active?id=' + id)
  }

  notactive(id: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(this.url + 'this/not-active?id=' + id)

  }


  crate_support_category(item: {farmer_id: number , fruit_category_id: number , category_id: number}): Observable<Response<any>>{
    return this.httpClient.post<Response<any>>(this.url + 'this/created-support-fruit' , {
      SupportFruitFarmer: item
    })
  }


  delete_support_category(){

  }


}
