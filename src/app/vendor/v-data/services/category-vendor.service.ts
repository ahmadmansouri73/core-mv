import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { conf } from 'src/conf';

@Injectable({
  providedIn: 'root'
})
export class CategoryVendorService {

  constructor(private httpClient: HttpClient) { }



  public activeCategories(filter: any = {}) {
    return this.httpClient.get(conf.baseUrl + 'vendor/cateogries')
  }



  public activeCategory(id: number) {
    return this.httpClient.get(conf.baseUrl + 'vendor/active-category?id_category=' + id )

  }

  public notActiveCategory(id: number) {
    return this.httpClient.get(conf.baseUrl + 'vendor/notactive-category?id_category=' + id )
  }


}
