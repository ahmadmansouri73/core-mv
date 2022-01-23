import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSelectModule, NbSidebarModule, NbStepperModule} from "@nebular/theme";

import { NgOtpInputModule } from  'ng-otp-input';
import { OnlyNumbersDirective } from './directive/only-numbers.directive';


@NgModule({
  declarations: [
    ProgressBarComponent,
    OnlyNumbersDirective
  ],
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  exports: [
    ProgressBarComponent,
    FormsModule,
    ReactiveFormsModule,
    NbIconModule,
    NbLayoutModule,
    NbMenuModule,
    NbSidebarModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    NgOtpInputModule,
    OnlyNumbersDirective,
    NbStepperModule
  ]
})
export class SharedModule { }
