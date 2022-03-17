import { DetailInvoiceComponent } from './../../farmer/farmer-invoice/detail-invoice/detail-invoice.component';
import { CreateFarmerInvoiceProductComponent } from './create-farmer-invoice-product/create-farmer-invoice-product.component';
import { ListFarmerInvoiceComponent } from './list-farmer-invoice/list-farmer-invoice.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '' , redirectTo: 'index' , pathMatch: 'full' },
  {path: '' , component: InvoiceComponent , children: [
    {path: 'index' , component: ListFarmerInvoiceComponent},
    {path: 'detail/:id' , component: DetailInvoiceComponent},
    {path: 'create-invoice-product' , component: CreateFarmerInvoiceProductComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
