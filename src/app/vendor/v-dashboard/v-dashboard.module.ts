import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VDashboardRoutingModule } from './v-dashboard-routing.module';
import { VDashboardComponent } from './v-dashboard/v-dashboard.component';


@NgModule({
  declarations: [
    VDashboardComponent
  ],
  imports: [
    CommonModule,
    VDashboardRoutingModule
  ]
})
export class VDashboardModule { }
