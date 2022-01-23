import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VDashboardComponent } from './v-dashboard/v-dashboard.component';

const routes: Routes = [
  {path: '' , component: VDashboardComponent , children: [
    {path: 'category' , loadChildren: ()=>import('../category/category.module').then(m => m.CategoryModule)},
    {path: 'storage' , loadChildren: () => import('../v-storage/v-storage.module').then(m => m.VStorageModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VDashboardRoutingModule { }
