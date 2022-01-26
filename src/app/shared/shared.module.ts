import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSelectModule, NbSidebarModule, NbStepperModule} from "@nebular/theme";

import { NgOtpInputModule } from  'ng-otp-input';
import { OnlyNumbersDirective } from './directive/only-numbers.directive';
import { NgxCurrencyModule } from 'ngx-currency';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { ImageComponent } from './image/image.component';


@NgModule({
  declarations: [
    ProgressBarComponent,
    OnlyNumbersDirective,
    ImagePickerComponent,
    ImageComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
  ],
  exports: [
    ProgressBarComponent,
    FormsModule,
    ImagePickerComponent,
    ImageComponent,
    ReactiveFormsModule,
    OnlyNumbersDirective,
    NgxCurrencyModule,
    NbIconModule,
    NbLayoutModule,
    NbMenuModule,
    NbSidebarModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    NgOtpInputModule,
    NbStepperModule,

  ]
})
export class SharedModule { }
