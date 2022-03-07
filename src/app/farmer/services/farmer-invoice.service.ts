import { conf } from 'src/conf';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FarmerInvoiceService {

  constructor(private HttpClient: HttpClient) { }

  invoices(filter: any = {}) {

    let query = '?'
    for (let data in filter) {
      if (filter[data] != null && filter[data].toString().trim() != '') {
        query += `${data}=${filter[data]}&`
      }
    }

    query =  query.replace(/[&,?]$/,"")
    return this.HttpClient.get(conf.baseUrl + 'farmer/invoice/all-invoice-product' + query)
  }

  invoice(id: number) {
    return this.HttpClient.get(conf.baseUrl + 'farmer/invoice/invoice-product?id_invoice=' + id)
  }
}
