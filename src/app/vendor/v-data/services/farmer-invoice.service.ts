import { patch } from '@nebular/theme';
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



  public allInvoiceProduct(filter: any = {}): Observable<Response<any>> {


    let query = '?'
    for (let data in filter) {
      if (filter[data] != null && filter[data].toString().trim() != '') {
        query += `${data}=${filter[data]}&`
      }
    }

    query =  query.replace(/[&,?]$/,"")


    return this.HttpClient.get<Response<any>>(this.url + 'all-invoice-product' + query);
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

  public paymentProductInvoice(id_invoice: number , id_product: number ,  item: any): Observable<any>{
    return this.HttpClient.post(conf.baseUrl + 'farmer/invoice/payment-invoice-product', {
      id_farmer_invoice_product: id_invoice,
      id_farmer_invoice_product_detail: id_product,
      details: item
    })
  }



}
