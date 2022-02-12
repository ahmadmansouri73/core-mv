import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { conf } from 'src/conf';

@Injectable({
  providedIn: 'root'
})
export class FruitCategoriesService {

  constructor(private httpClient: HttpClient) {
    this.fruitCategories$ = this.httpClient.get(conf.baseUrl + 'app/public/fruit-categories').pipe(shareReplay(1))
  }


  private readonly fruitCategories$: Observable<any>


  public search(filter: any = {}): Observable<any> {
    let query = '?'
    for (let data in filter) {
      if (filter[data] != null && filter[data].toString().trim() != '') {
        query += `${data}=${filter[data]}&`
      }
    }

    query =  query.replace(/[&,?]$/,"")

    return this.httpClient.get(conf.baseUrl + 'app/public/fruit-categories' + query)
  }


  public get fruitCategories(): Observable<any> {
    return this.fruitCategories$
  }


}
