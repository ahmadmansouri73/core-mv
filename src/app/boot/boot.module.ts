import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootRoutingModule } from './boot-routing.module';
import { BootService } from './boot.service';
import { AuthService } from '../core/services/auth.service';
import { ConfService } from '../core/services/conf.service';
import { combineLatest } from 'rxjs';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BootRoutingModule
  ],
  providers: [BootService]
})
export class BootModule {
  constructor(private authService: AuthService , private confService: ConfService){
    combineLatest(authService.attempAuth() , confService.config()).subscribe(
      ([auth , conf]) => {
        if (conf.status == false)
          alert('system offline')
      }
    )
  }
}
