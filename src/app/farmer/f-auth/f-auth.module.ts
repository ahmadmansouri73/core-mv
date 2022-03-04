import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FAuthRoutingModule } from './f-auth-routing.module';
import { ReqisterComponent } from './reqister/reqister.component';
import { ConfirmCodeComponent } from './confirm-code/confirm-code.component';


@NgModule({
  declarations: [
    ReqisterComponent,
    ConfirmCodeComponent
  ],
  imports: [
    CommonModule,
    FAuthRoutingModule
  ]
})
export class FAuthModule { }
