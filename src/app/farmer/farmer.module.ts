import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmerRoutingModule } from './farmer-routing.module';
import { FarmerDashboardComponent } from './farmer-dashboard/farmer-dashboard.component';


@NgModule({
  declarations: [
    FarmerDashboardComponent,
  ],
  imports: [
    CommonModule,
    FarmerRoutingModule
  ]
})
export class FarmerModule { }
