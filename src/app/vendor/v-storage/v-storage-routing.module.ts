import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppendStorageComponent } from './append-storage/append-storage.component';
import { StorageComponent } from './storage/storage.component';
import { StoragesComponent } from './storages/storages.component';

const routes: Routes = [
  {path: '' , redirectTo: 'storages' , pathMatch: 'full'},
  {path: '' , component: StorageComponent , children: [

    {path: "storages" , component:StoragesComponent },
    {path: 'created' , component: AppendStorageComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VStorageRoutingModule { }
