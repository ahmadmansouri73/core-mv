import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmerInvoiceRoutingModule } from './farmer-invoice-routing.module';
import { IndexInvoiceComponent } from './index-invoice/index-invoice.component';


@NgModule({
  declarations: [
    IndexInvoiceComponent
  ],
  imports: [
    CommonModule,
    FarmerInvoiceRoutingModule
  ]
})
export class FarmerInvoiceModule { }
