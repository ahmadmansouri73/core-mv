import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VDashboardComponent } from './v-dashboard/v-dashboard.component';
import {MenuComponent} from "./menu/menu.component";

const routes: Routes = [
  {path: '' , redirectTo: 'menu' , pathMatch: 'full'},
  {path: '' , component: VDashboardComponent , children: [
      {path: 'features' , loadChildren: () => import('../v-routing-features/v-routing-features.module').then(m => m.VRoutingFeaturesModule)},
      {path: 'menu' , component: MenuComponent },
      {path: 'profile' , loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule)},
      {path: 'category' , loadChildren: ()=>import('../category/category.module').then(m => m.CategoryModule)},
      {path: 'storage' , loadChildren: () => import('../v-storage/v-storage.module').then(m => m.VStorageModule)},
      {path: 'product' , loadChildren: () => import('../product/product.module').then(m => m.ProductModule)},
      {path: 'farmer' , loadChildren: () => import('../farmer/farmer.module').then(m => m.FarmerModule)},
      {path: 'invoice' , loadChildren:() => import('../invoice/invoice.module').then(m => m.InvoiceModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VDashboardRoutingModule { }
