import { MenuDashboardComponent } from './../farmer-dashboard/menu-dashboard/menu-dashboard.component';
import { FarmerDashboardComponent } from './../farmer-dashboard/farmer-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '' , component: FarmerDashboardComponent , children: [
    {path: 'index' , component: MenuDashboardComponent},
    {path: 'connection' , loadChildren: () => import('../farmer-connection/farmer-connection.module').then(m => m.FarmerConnectionModule)},
    {path: 'invoice' , loadChildren: () => import('../farmer-invoice/farmer-invoice.module').then(m => m.FarmerInvoiceModule)},
    {path: 'profile' , loadChildren: () => import('../farmer-profile/farmer-profile.module').then(m => m.FarmerProfileModule)}
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmerBootRoutingModule { }
