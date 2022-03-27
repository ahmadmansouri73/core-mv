import { DeleteInvoiceComponent } from './delete-invoice/delete-invoice.component';
import { FarmerInvoiceService } from './../../../v-data/services/farmer-invoice.service';
import { switchMap, of, filter, tap, map } from 'rxjs';
import { NotifyService } from './../../../../core/services/ui/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { AppendProductFarmerInvoiceComponent } from '../../append-product-farmer-invoice/append-product-farmer-invoice.component';
import { AppendDeliveryFarmerInvoiceComponent } from '../../append-delivery-farmer-invoice/append-delivery-farmer-invoice.component';

@Component({
  selector: 'app-info-invoice',
  templateUrl: './info-invoice.component.html',
  styleUrls: ['./info-invoice.component.css']
})
export class InfoInvoiceComponent implements OnInit {

  constructor(
    private matDialog: MatDialog,
    private notifyService: NotifyService,
    private farmerInvoiceService: FarmerInvoiceService
  ) { }
  @Output() ok = new EventEmitter()

  @Input() data: any

  @Output() updateInvoice = new EventEmitter()
  @Output() deleteInvoice = new EventEmitter()

  delete(): void {
    let dialog = this.matDialog.open(DeleteInvoiceComponent , {
      width: '100%'
    })


    dialog.afterClosed()
    .pipe(
      filter(data =>  data === true),
      switchMap(_ => this.farmerInvoiceService.delete_invoice(this.data.id_farmer_invoice_product)),
      filter(data => data.status == true),
      tap(data => this.notifyService.success(data.message))
    )
    .subscribe(_ => this.deleteInvoice.emit())
  }


  create_product() {
    let dialog = this.matDialog.open(AppendProductFarmerInvoiceComponent , {
      width: '100%'
    })

    dialog.afterClosed()
    .pipe(
      filter(data => data != null),
      map(data => {
        let item = {
          category_id: data.category.id_category,
          fruit_category_id: data.fruit_category.id_fruit_category,
          fruit_id: data.fruit.id_fruit,
          value_type_id: data.value_type.id,
          value: data.value,
          count_box: data.count_box,
        }

        return item
      }),
      switchMap(data => this.farmerInvoiceService.append_product_invoice(this.data.id_farmer_invoice_product , data)),
      filter(data => data.status == true),
      tap(data => this.notifyService.success(data.message))
    )
    .subscribe(_ => this.updateInvoice.emit())
  }

  create_delivery() {
    let dialog =  this.matDialog.open(AppendDeliveryFarmerInvoiceComponent, {
      width: '100%'
    })

    dialog.afterClosed()
    .pipe(
      filter(data => data != null),
      switchMap(data => this.farmerInvoiceService.append_delivery_invoice(this.data.id_farmer_invoice_product , data)),
      filter(data => data.status == true),
      tap(data => this.notifyService.success(data.message))
    )
    .subscribe(_ => this.updateInvoice.emit())
  }

  ngOnInit(): void {
  }

}
