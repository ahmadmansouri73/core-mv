import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VDataModule } from './v-data/v-data.module';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
    VDataModule,
    SharedModule,
  ]
})
export class VendorModule {

}
