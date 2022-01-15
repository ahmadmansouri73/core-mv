import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VAuthRoutingModule } from './v-auth-routing.module';
import { VLoginComponent } from './v-login/v-login.component';
import { VRegisterComponent } from './v-register/v-register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser'
import { VDataModule } from '../v-data/v-data.module';


@NgModule({
  declarations: [
    VLoginComponent,
    VRegisterComponent
  ],
  imports: [
    CommonModule,
    VAuthRoutingModule,
    SharedModule,
    VDataModule

  ]
})
export class VAuthModule { }
