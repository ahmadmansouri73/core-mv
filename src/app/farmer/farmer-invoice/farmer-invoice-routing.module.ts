import { DetailInvoiceComponent } from './detail-invoice/detail-invoice.component';
import { IndexInvoiceComponent } from './index-invoice/index-invoice.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '' , component: IndexInvoiceComponent},
  {path: 'view/:id' , component: DetailInvoiceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmerInvoiceRoutingModule { }
