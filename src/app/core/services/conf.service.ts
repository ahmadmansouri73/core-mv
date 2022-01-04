import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { conf } from 'src/conf';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class ConfService {

  constructor(private httpClient: HttpClient) { }



  public app(): Observable<Response<any>>
  {
    return this.httpClient.get<Response<any>>(conf.baseUrl + 'conf')
  }

}
