import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/core/interfaces/response';
import { conf } from 'src/conf';

@Injectable({
  providedIn: 'root'
})
export class CategoryVendorService {

  constructor(private httpClient: HttpClient) { }



  public activeCategories(filter: any = {}): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(conf.baseUrl + 'vendor/api/active-categories')
  }


  public categories(filter: any = {}): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(conf.baseUrl + 'vendor/api/categories')
  }

  public appendCategory(id: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(conf.baseUrl + 'vendor/api/append-category?category_id=' + id )

  }

  public activeCategory(id: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(conf.baseUrl + 'vendor/api/active-category?category_id=' + id )
  }

  public notActiveCategory(id: number): Observable<Response<any>> {
    return this.httpClient.get<Response<any>>(conf.baseUrl + 'vendor/api/notactive-category?category_id=' + id )
  }


}
