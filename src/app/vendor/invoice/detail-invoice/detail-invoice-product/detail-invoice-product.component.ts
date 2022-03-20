import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-detail-invoice-product',
  templateUrl: './detail-invoice-product.component.html',
  styleUrls: ['./detail-invoice-product.component.css']
})
export class DetailInvoiceProductComponent implements OnInit {

  constructor() { }

  @Input() data: any



  @Output() ok = new EventEmitter()
  @Input() payment: any[] = []
  @Input() fruit: any = null



  ngOnInit(): void {
  }

}
