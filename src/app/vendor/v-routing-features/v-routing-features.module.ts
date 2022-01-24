import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VRoutingFeaturesRoutingModule } from './v-routing-features-routing.module';
import { RoutingFeaturesComponent } from './routing-features/routing-features.component';


@NgModule({
  declarations: [
    RoutingFeaturesComponent
  ],
  imports: [
    CommonModule,
    VRoutingFeaturesRoutingModule
  ]
})
export class VRoutingFeaturesModule { }
