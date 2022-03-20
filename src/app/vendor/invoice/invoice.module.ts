import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice/invoice.component';
import { ListFarmerInvoiceComponent } from './list-farmer-invoice/list-farmer-invoice.component';
import { CreateFarmerInvoiceProductComponent } from './create-farmer-invoice-product/create-farmer-invoice-product.component';
import { AppendProductFarmerInvoiceComponent } from './append-product-farmer-invoice/append-product-farmer-invoice.component';
import { AppendDeliveryFarmerInvoiceComponent } from './append-delivery-farmer-invoice/append-delivery-farmer-invoice.component';
import {MatTabsModule} from '@angular/material/tabs';
import { DetailInvoiceComponent } from './detail-invoice/detail-invoice.component';
import { VPaymentInvoiceProductComponent } from './detail-invoice/v-payment-invoice-product/v-payment-invoice-product.component';
import { DetailInvoiceProductComponent } from './detail-invoice/detail-invoice-product/detail-invoice-product.component';
import { DetailInvoiceDeliveryComponent } from './detail-invoice/detail-invoice-delivery/detail-invoice-delivery.component';
import { InfoInvoiceComponent } from './detail-invoice/info-invoice/info-invoice.component';
import { UpdateProductDetailComponent } from './detail-invoice/detail-invoice-product/update-product-detail/update-product-detail.component';
import { PaymentProductDetailComponent } from './detail-invoice/detail-invoice-product/payment-product-detail/payment-product-detail.component';


@NgModule({
  declarations: [
    InvoiceComponent,
    ListFarmerInvoiceComponent,
    CreateFarmerInvoiceProductComponent,
    AppendProductFarmerInvoiceComponent,
    AppendDeliveryFarmerInvoiceComponent,
    DetailInvoiceComponent,
    VPaymentInvoiceProductComponent,
    DetailInvoiceProductComponent,
    DetailInvoiceDeliveryComponent,
    InfoInvoiceComponent,
    UpdateProductDetailComponent,
    PaymentProductDetailComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedModule,
    MatTabsModule
  ]
})
export class InvoiceModule { }
