import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FAuthRoutingModule } from './f-auth-routing.module';
import { ReqisterComponent } from './reqister/reqister.component';
import { NgOtpInputModule } from 'ng-otp-input';


@NgModule({
  declarations: [
    ReqisterComponent,

  ],
  imports: [
    CommonModule,
    FAuthRoutingModule,
    SharedModule,
    NgOtpInputModule
  ]
})
export class FAuthModule { }
