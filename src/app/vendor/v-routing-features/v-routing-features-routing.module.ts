import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoutingFeaturesComponent} from "./routing-features/routing-features.component";

const routes: Routes = [
  {path: '' , component: RoutingFeaturesComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VRoutingFeaturesRoutingModule { }
