import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '' , redirectTo: 'dashboard' , pathMatch: 'full'},
  {path: 'dashboard', loadChildren: () => import('./v-dashboard/v-dashboard.module').then(m => m.VDashboardModule)},
  {path: 'auth' , loadChildren: () => import('./v-auth/v-auth.module').then(m => m.VAuthModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule {
  constructor(){console.log('Hi ahmad');
  }
 }
