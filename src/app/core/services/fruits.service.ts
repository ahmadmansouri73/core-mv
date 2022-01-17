import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { conf } from 'src/conf';

@Injectable({
  providedIn: 'root'
})
export class FruitsService {

  constructor(private httpClient: HttpClient) {
    this.fruits$ = this.httpClient.get(conf.baseUrl + 'public/fruits').pipe(shareReplay(1))
  }


  private readonly fruits$: Observable<any>


  public search(filter: any = {}): Observable<any> {
    let query = '?'
    for (let data in filter) {
      if (filter[data] != null && filter[data].toString().trim() != '') {
        query += `${data}=${filter[data]}&`
      }
    }

    query =  query.replace(/[&,?]$/,"")

    return this.httpClient.get(conf.baseUrl + 'public/fruits' + query)
  }


  public get fruit(): Observable<any> {
    return this.fruits$
  }
}
