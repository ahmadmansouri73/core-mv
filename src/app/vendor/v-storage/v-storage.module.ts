import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VStorageRoutingModule } from './v-storage-routing.module';
import { StoragesComponent } from './storages/storages.component';
import { AppendStorageComponent } from './append-storage/append-storage.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StorageComponent } from './storage/storage.component';


@NgModule({
  declarations: [
    StoragesComponent,
    AppendStorageComponent,
    StorageComponent
  ],
  imports: [
    CommonModule,
    VStorageRoutingModule,
    SharedModule
  ]
})
export class VStorageModule { }
