import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice/invoice.component';
import { ListFarmerInvoiceComponent } from './list-farmer-invoice/list-farmer-invoice.component';
import { CreateFarmerInvoiceProductComponent } from './create-farmer-invoice-product/create-farmer-invoice-product.component';
import { AppendProductFarmerInvoiceComponent } from './append-product-farmer-invoice/append-product-farmer-invoice.component';
import { AppendDeliveryFarmerInvoiceComponent } from './append-delivery-farmer-invoice/append-delivery-farmer-invoice.component';


@NgModule({
  declarations: [
    InvoiceComponent,
    ListFarmerInvoiceComponent,
    CreateFarmerInvoiceProductComponent,
    AppendProductFarmerInvoiceComponent,
    AppendDeliveryFarmerInvoiceComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedModule
  ]
})
export class InvoiceModule { }
