import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppendProductComponent } from './append-product/append-product.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [
  {path: '' , component: ProductComponent , children: [
    {path: 'create' , component: AppendProductComponent},
    {path: 'index' , component: ProductsComponent},
    {path: 'update/:id' , component: UpdateProductComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
