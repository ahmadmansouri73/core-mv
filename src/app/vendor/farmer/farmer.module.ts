import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmerRoutingModule } from './farmer-routing.module';
import { FarmerComponent } from './farmer/farmer.component';
import { ListFarmerComponent } from './list-farmer/list-farmer.component';
import { AppendFarmerComponent } from './append-farmer/append-farmer.component';
import { AppendSupportFruitFarmerComponent } from './append-support-fruit-farmer/append-support-fruit-farmer.component';


@NgModule({
  declarations: [
    FarmerComponent,
    ListFarmerComponent,
    AppendFarmerComponent,
    AppendSupportFruitFarmerComponent
  ],
  imports: [
    CommonModule,
    FarmerRoutingModule,
    SharedModule
  ]
})
export class FarmerModule { }
