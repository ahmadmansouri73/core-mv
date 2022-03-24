import { NotifyService } from './../../../../core/services/ui/notify.service';
import { filter, switchMap, tap } from 'rxjs';
import { PaymentProductDetailComponent } from './payment-product-detail/payment-product-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FarmerInvoiceService } from './../../../v-data/services/farmer-invoice.service';

@Component({
  selector: 'app-detail-invoice-product',
  templateUrl: './detail-invoice-product.component.html',
  styleUrls: ['./detail-invoice-product.component.css']
})
export class DetailInvoiceProductComponent implements OnInit {

  constructor(
    private farmerInvoiceService: FarmerInvoiceService,
    private matDialog: MatDialog,
    private notifyService: NotifyService

  ) { }

  @Input() data: any



  @Output() ok = new EventEmitter()
  @Input() payment: any[] = []

  @Output() updateInvoice = new EventEmitter()



  create_payment(){
    let dialog  = this.matDialog.open(PaymentProductDetailComponent , {
      width: '100%',
      data: this.data
    })

    dialog.afterClosed()
    .pipe(
      filter(data => data != null && data != undefined),
      switchMap(data => this.farmerInvoiceService.paymentProductInvoice(this.data.farmer_invoice_product_id,this.data.id_farmer_invoice_product_detail ,data)),
      filter(data => data.status == true),
      tap(data => this.notifyService.success(data.message))
    )
    .subscribe(_ => this.updateInvoice.emit() )
  }


  ngOnInit(): void {

  }

}
