import { conf } from 'src/conf';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FarmerInvoiceService {

  constructor(private HttpClient: HttpClient) { }

  invoices() {
    return this.HttpClient.get(conf.baseUrl + 'farmer/invoice/all-invoice-product')
  }

  invoice(id: number) {
    return this.HttpClient.get(conf.baseUrl + 'farmer/invoice/invoice-product?id_invoice=' + id)
  }
}
