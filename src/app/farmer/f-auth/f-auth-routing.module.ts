import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReqisterComponent } from './reqister/reqister.component';

const routes: Routes = [
  {path: '' , component: ReqisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FAuthRoutingModule { }
