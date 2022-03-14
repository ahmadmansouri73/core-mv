import { FarmerBootGuard } from './farmer-boot.guard';
import { RootComponent } from './root/root.component';
import { FarmerModule } from './../vendor/farmer/farmer.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreBootGuard } from './store-boot.guard';
import { VendorBootGuard } from './vendor-boot.guard';

const routes: Routes = [
  {path: 'boot' , redirectTo: 'root' , pathMatch: 'full'},
  {path: '' , redirectTo: 'root' , pathMatch: 'full'},
  {path: 'root' , component: RootComponent},

  {path: 'store' , canLoad: [StoreBootGuard] , loadChildren: () => import('../store/store.module').then(m => m.StoreModule)},
  {path: 'vendor',  canLoad: [VendorBootGuard], loadChildren: () => import('../vendor/vendor.module').then(m => m.VendorModule)},
  {path: 'farmer', canLoad: [FarmerBootGuard], loadChildren: () => import('../farmer/farmer.module').then(m => m.FarmerModule)}


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BootRoutingModule {}
