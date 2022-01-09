import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { conf } from 'src/conf';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class ConfService {


  private conf$: Observable<any>
  constructor(private httpClient: HttpClient) {
    this.conf$ = httpClient.get(conf.baseUrl + 'conf').pipe(shareReplay())
  }



  config(): Observable<any> {
    return this.conf$;
  }

}
