import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { conf } from 'src/conf';

@Injectable({
  providedIn: 'root'
})
export class ValueTypeService {

  constructor(private httpClient: HttpClient) {
    this.value_type$ = this.httpClient.get(conf.baseUrl + 'app/public/value-types').pipe(shareReplay(1))
  }

  private readonly value_type$: Observable<any>

  public get valueTypes(): Observable<any> {
    return this.value_type$
  }

}
