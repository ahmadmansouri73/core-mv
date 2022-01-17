import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { conf } from 'src/conf';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
    this.products$ = this.httpClient.get(conf.baseUrl + 'public/products').pipe(shareReplay(1))
  }


  private readonly products$: Observable<any>


  public search(filter: any = {}): Observable<any> {
    let query = '?'
    for (let data in filter) {
      if (filter[data] != null && filter[data].toString().trim() != '') {
        query += `${data}=${filter[data]}&`
      }
    }

    query =  query.replace(/[&,?]$/,"")

    return this.httpClient.get(conf.baseUrl + 'public/products' + query)
  }


  public get products(): Observable<any> {
    return this.products$
  }}
