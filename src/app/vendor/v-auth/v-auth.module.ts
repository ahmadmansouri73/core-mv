import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VAuthRoutingModule } from './v-auth-routing.module';
import { VLoginComponent } from './v-login/v-login.component';
import { VRegisterComponent } from './v-register/v-register.component';


@NgModule({
  declarations: [
    VLoginComponent,
    VRegisterComponent
  ],
  imports: [
    CommonModule,
    VAuthRoutingModule
  ]
})
export class VAuthModule { }
