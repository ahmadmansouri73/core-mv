import { Observable } from 'rxjs';
import { conf } from 'src/conf';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FarmerConnectionService {

  constructor(private httpClient: HttpClient) { }

  connections(): Observable<any> {
    return this.httpClient.get(conf.baseUrl + 'farmer/api/connections')
  }
}
