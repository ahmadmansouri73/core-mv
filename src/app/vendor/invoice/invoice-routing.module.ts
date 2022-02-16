import { CreateFarmerInvoiceProductComponent } from './create-farmer-invoice-product/create-farmer-invoice-product.component';
import { ListFarmerInvoiceComponent } from './list-farmer-invoice/list-farmer-invoice.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { patch } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '' , redirectTo: 'index' , pathMatch: 'full' },
  {path: '' , component: InvoiceComponent , children: [
    {path: 'index' , component: ListFarmerInvoiceComponent},
    {path: 'create-invoice-product' , component: CreateFarmerInvoiceProductComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
