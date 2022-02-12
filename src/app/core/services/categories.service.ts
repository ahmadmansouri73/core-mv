import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { conf } from 'src/conf';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: HttpClient) {
    this.categories$ = httpClient.get(conf.baseUrl + 'app/public/categories').pipe(shareReplay(1))
  }


  private readonly categories$: Observable<any>


  public search(filter: any = {}): Observable<any>
  {
    let query = '?'
    for (let data in filter) {
      if (filter[data] != null && filter[data].toString().trim() != '') {
        query += `${data}=${filter[data]}&`
      }
    }

    query =  query.replace(/[&,?]$/,"")
    return this.httpClient.get(conf.baseUrl + 'app/public/categories' + query)
  }

  public get categories(): Observable<any> {
    return this.categories$
  }



}
