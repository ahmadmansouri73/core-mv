import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from './v-data/guards/dashboard.guard';

const routes: Routes = [
  {path: '' , redirectTo: 'dashboard' , pathMatch: 'full'},
  {path: 'dashboard', canActivate: [DashboardGuard] , canLoad: [DashboardGuard], loadChildren: () => import('./v-dashboard/v-dashboard.module').then(m => m.VDashboardModule)},
  {path: 'auth' , loadChildren: () => import('./v-auth/v-auth.module').then(m => m.VAuthModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule {
  constructor(){
  }
 }
