import { filter, tap } from 'rxjs';
import { FarmerInvoiceService } from './../../../v-data/services/farmer-invoice.service';
import { NotifyService } from './../../../../core/services/ui/notify.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-detail-invoice-delivery',
  templateUrl: './detail-invoice-delivery.component.html',
  styleUrls: ['./detail-invoice-delivery.component.css']
})
export class DetailInvoiceDeliveryComponent implements OnInit {

  constructor(
    private notifyService: NotifyService,
    private farmerInvoiceService: FarmerInvoiceService
  ) { }

  @Input() data: any

  @Output() updateInvoice = new EventEmitter()

  @Output() ok = new EventEmitter()



  ngOnInit(): void {
    console.log(this.data);
  }


  update_delivery() {

  }

  delete_delivery() {
    this.farmerInvoiceService.delete_product_delivery(this.data.farmer_invoice_product_id , this.data.id_farmer_invoice_product_delivery)
    .pipe(
      filter(data => data.status == true),
      tap(data => this.notifyService.success(data.message))
    )
    .subscribe(_ => this.updateInvoice.emit())
  }



}
