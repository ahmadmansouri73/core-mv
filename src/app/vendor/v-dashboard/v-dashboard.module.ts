import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VDashboardRoutingModule } from './v-dashboard-routing.module';
import { VDashboardComponent } from './v-dashboard/v-dashboard.component';
import {SharedModule} from "../../shared/shared.module";
import {NbSidebarModule} from "@nebular/theme";


@NgModule({
  declarations: [
    VDashboardComponent
  ],
  imports: [
    CommonModule,
    VDashboardRoutingModule,
    SharedModule,
    NbSidebarModule

  ]
})
export class VDashboardModule { }
