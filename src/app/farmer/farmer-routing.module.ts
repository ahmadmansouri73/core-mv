import { FDashboardGuard } from './guards/f-dashboard.guard';
import { FarmerDashboardComponent } from './farmer-dashboard/farmer-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';

const routes: Routes = [
  {path: '' ,canActivate:[FDashboardGuard],  canLoad:[FDashboardGuard] , component: FarmerDashboardComponent , children: [
    {path: 'connection' , loadChildren: () => import('./farmer-connection/farmer-connection.module').then(m => m.FarmerConnectionModule)},
    {path: 'invoice' , loadChildren: () => import('./farmer-invoice/farmer-invoice.module').then(m => m.FarmerInvoiceModule)},
    {path: 'profile' , loadChildren: () => import('./farmer-profile/farmer-profile.module').then(m => m.FarmerProfileModule)}
  ]},
  {path: 'auth',  loadChildren: () =>  import('./f-auth/f-auth.module').then(m => m.FAuthModule)}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmerRoutingModule { }
