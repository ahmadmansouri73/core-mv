import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { conf } from 'src/conf';

@Injectable({
  providedIn: 'root'
})
export class CityService {


  constructor(private httpClient: HttpClient) {
    this.$cities$ = this.httpClient.get(conf.baseUrl + 'app/public/cities').pipe(shareReplay(1))
  }

  private $cities$: Observable<any>
  public search(filter: any = {}): Observable<any> {
    let query = '?'
    for (let data in filter) {
      if (filter[data] != null && filter[data].toString().trim() != '') {
        query += `${data}=${filter[data]}&`
      }
    }

    query =  query.replace(/[&,?]$/,"")

    return this.httpClient.get(conf.baseUrl + 'app/public/cities' + query )
  }

  public cityOne(id: number): Observable<any>
  {
    return this.httpClient.get(conf.baseUrl + 'app/public/citie?id=' + id)
  }

  public get cities(): Observable<any> {
    return this.$cities$
  }


}
