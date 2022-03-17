import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VRouterFarmerRoutingModule } from './v-router-farmer-routing.module';
import { RouterFarmerComponent } from './router-farmer/router-farmer.component';


@NgModule({
  declarations: [
    RouterFarmerComponent
  ],
  imports: [
    CommonModule,
    VRouterFarmerRoutingModule
  ]
})
export class VRouterFarmerModule { }
