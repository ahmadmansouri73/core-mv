import { conf } from './../../../../conf';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Response } from 'src/app/core/interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class FarmerInvoiceService {

  constructor(
    private HttpClient: HttpClient
  ) { }

  private readonly url = conf.baseUrl + 'farmer/invoice/'



  public allInvoiceProduct(): Observable<Response<any>> {
    return this.HttpClient.get<Response<any>>( this.url + 'all-invoice-product');
  }

  public oneInvoiceProduct(id: number): Observable<Response<any>> {
    return this.HttpClient.get<Response<any>>( this.url + 'invoice-product?id_invoice=' + id);
  }

  public createInvoiceProduct(item: {invoice: any , products: any[] , deliveries: any[]}): Observable<Response<any>> {
    return this.HttpClient.post<Response<any>>(this.url + 'create-invoice-product' , {
      invoice: {
        FarmerInvoiceProduct: item.invoice,
        products: item.products,
        deliveries: item.deliveries
      }
    })
  }


}