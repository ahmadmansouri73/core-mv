import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { conf } from 'src/conf';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private httpClient: HttpClient) {
    this.provinces$ = this.httpClient.get(conf.baseUrl + 'app/public/provinces').pipe(shareReplay(1))
  }

  private provinces$: Observable<any>

  public search(filter: any = {}): Observable<any> {
    let query = '?'
    for (let data in filter) {
      if (filter[data] != null && filter[data].toString().trim() != '') {
        query += `${data}=${filter[data]}&`
      }
    }

    query =  query.replace(/[&,?]$/,"")

    return this.httpClient.get(conf.baseUrl + 'app/public/provinces' + query)
  }

  public provinceOne(id: number): Observable<any>
  {
    return this.httpClient.get(conf.baseUrl + 'app/public/province?id=' + id)
  }


  public get provinces(): Observable<any> {
    return this.provinces$
  }
}
