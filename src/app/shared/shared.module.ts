import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';

import { OnlyNumbersDirective } from './directive/only-numbers.directive';
import { NgxCurrencyModule } from 'ngx-currency';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { ImageComponent } from './image/image.component';
import { DigitOrFloatDirective } from './directive/digit-or-float.directive';


@NgModule({
  declarations: [
    ProgressBarComponent,
    OnlyNumbersDirective,
    ImagePickerComponent,
    ImageComponent,
    DigitOrFloatDirective
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
    DigitOrFloatDirective,
    MatDialogModule,
    NgxCurrencyModule,
    NgSelectModule


  ]
})
export class SharedModule { }
