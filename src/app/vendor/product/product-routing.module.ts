import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppendProductComponent } from './append-product/append-product.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {path: '' , component: ProductComponent , children: [
    {path: 'create' , component: AppendProductComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
