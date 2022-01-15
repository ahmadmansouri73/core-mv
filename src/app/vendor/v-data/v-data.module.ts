import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandnameCheckingDirective } from './directive/brandname-checking.directive';



@NgModule({
  declarations: [
    BrandnameCheckingDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BrandnameCheckingDirective
  ]
})
export class VDataModule { }
