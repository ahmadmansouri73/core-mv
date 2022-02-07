import { AppendFarmerComponent } from './append-farmer/append-farmer.component';
import { ListFarmerComponent } from './list-farmer/list-farmer.component';
import { FarmerComponent } from './farmer/farmer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { patch } from '@nebular/theme';

const routes: Routes = [
  {path: '' ,redirectTo: 'index' , pathMatch: 'full'},
  {path: '' , component: FarmerComponent , children: [
    {path: 'index' , component: ListFarmerComponent},
    {path: 'create-farmer' , component: AppendFarmerComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmerRoutingModule { }
