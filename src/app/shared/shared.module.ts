import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSidebarModule} from "@nebular/theme";



@NgModule({
  declarations: [
    ProgressBarComponent
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

  ]
})
export class SharedModule { }
