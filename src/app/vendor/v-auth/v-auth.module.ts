import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VAuthRoutingModule } from './v-auth-routing.module';
import { VLoginComponent } from './v-login/v-login.component';
import { VRegisterComponent } from './v-register/v-register.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { VConfirmComponent } from './v-register/v-confirm/v-confirm.component';
import { NgOtpInputModule } from 'ng-otp-input';


@NgModule({
  declarations: [
    VLoginComponent,
    VRegisterComponent,
    VConfirmComponent
  ],
  imports: [
    CommonModule,
    VAuthRoutingModule,
    SharedModule,
    NgOtpInputModule

  ]
})
export class VAuthModule { }
