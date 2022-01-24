import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VDashboardRoutingModule } from './v-dashboard-routing.module';
import { VDashboardComponent } from './v-dashboard/v-dashboard.component';
import {SharedModule} from "../../shared/shared.module";
import {NbSidebarModule} from "@nebular/theme";
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    VDashboardComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    VDashboardRoutingModule,
    SharedModule,

  ]
})
export class VDashboardModule { }
