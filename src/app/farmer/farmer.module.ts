import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmerRoutingModule } from './farmer-routing.module';
import { FarmerDashboardComponent } from './farmer-dashboard/farmer-dashboard.component';
import { MenuDashboardComponent } from './farmer-dashboard/menu-dashboard/menu-dashboard.component';


@NgModule({
  declarations: [
    FarmerDashboardComponent,
    MenuDashboardComponent,
  ],
  imports: [
    CommonModule,
    FarmerRoutingModule
  ]
})
export class FarmerModule { }
