import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmerConnectionRoutingModule } from './farmer-connection-routing.module';
import { IndexConnectionComponent } from './index-connection/index-connection.component';


@NgModule({
  declarations: [
    IndexConnectionComponent
  ],
  imports: [
    CommonModule,
    FarmerConnectionRoutingModule
  ]
})
export class FarmerConnectionModule { }
