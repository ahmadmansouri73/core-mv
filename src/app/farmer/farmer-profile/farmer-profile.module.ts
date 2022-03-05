import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmerProfileRoutingModule } from './farmer-profile-routing.module';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { IndexProfileComponent } from './index-profile/index-profile.component';


@NgModule({
  declarations: [
    UpdateProfileComponent,
    IndexProfileComponent
  ],
  imports: [
    CommonModule,
    FarmerProfileRoutingModule,
    SharedModule
  ]
})
export class FarmerProfileModule { }
