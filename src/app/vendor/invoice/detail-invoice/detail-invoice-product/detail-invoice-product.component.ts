import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FarmerInvoiceService } from './../../../v-data/services/farmer-invoice.service';

@Component({
  selector: 'app-detail-invoice-product',
  templateUrl: './detail-invoice-product.component.html',
  styleUrls: ['./detail-invoice-product.component.css']
})
export class DetailInvoiceProductComponent implements OnInit {

  constructor(
    private farmerInvoiceService: FarmerInvoiceService

  ) { }

  @Input() data: any



  @Output() ok = new EventEmitter()
  @Input() payment: any[] = []



  ngOnInit(): void {
  }

}
