import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { AppendProductComponent } from './append-product/append-product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewNewProductComponent } from './append-product/view-new-product/view-new-product.component';


@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent,
    AppendProductComponent,
    ViewNewProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }
