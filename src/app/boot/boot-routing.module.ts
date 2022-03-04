import { FarmerModule } from './../vendor/farmer/farmer.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreBootGuard } from './store-boot.guard';
import { VendorBootGuard } from './vendor-boot.guard';

const routes: Routes = [
  {path: 'boot' , redirectTo: 'vendor' , pathMatch: 'full'},

  {path: '' , redirectTo: 'vendor' , pathMatch: 'full'},
  {path: 'store' , canLoad: [StoreBootGuard] , loadChildren: () => import('../store/store.module').then(m => m.StoreModule)},
  {path: 'vendor',  canLoad: [VendorBootGuard], loadChildren: () => import('../vendor/vendor.module').then(m => m.VendorModule)},
  {path: 'farmer' , loadChildren: () => import('../farmer/farmer.module').then(m => m.FarmerModule)}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BootRoutingModule {}
