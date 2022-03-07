import { Component, Inject, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payment-invoice-product',
  templateUrl: './payment-invoice-product.component.html',
  styleUrls: ['./payment-invoice-product.component.css']
})
export class PaymentInvoiceProductComponent implements OnInit {

  constructor() {}


  @Output() ok = new EventEmitter()
  @Input() payment: any[] = []
  @Input() fruit: any = null
  ngOnInit(): void {
  }

}
