import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-detail-invoice-delivery',
  templateUrl: './detail-invoice-delivery.component.html',
  styleUrls: ['./detail-invoice-delivery.component.css']
})
export class DetailInvoiceDeliveryComponent implements OnInit {

  constructor() { }

  @Input() data: any


  @Output() ok = new EventEmitter()


  
  ngOnInit(): void {
  }

}
