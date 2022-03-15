import { NotifyService } from './../core/services/ui/notify.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootRoutingModule } from './boot-routing.module';
import { BootService } from './boot.service';
import { AuthService } from '../core/services/auth.service';
import { ConfService } from '../core/services/conf.service';
import { combineLatest } from 'rxjs';
import { RootComponent } from './root/root.component';
import { Router } from '@angular/router';
import { User } from './User';


@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    CommonModule,
    BootRoutingModule
  ],
  providers: [BootService]
})
export class BootModule {




  constructor(
    private notify: NotifyService,
    private router: Router,
    private authService: AuthService,
    private confService: ConfService){


    combineLatest(authService.attempAuth() , confService.config()).subscribe(
      ([auth , conf]) => {

        if (auth.status == true) {
          let id: number = auth.data.type_id


          switch (id) {
            case User.BUYER:
              // farmer routing module farmer
              router.navigate(['/storage'])
              break;
            case User.VENDOR:
              // farmer routing module farmer
              router.navigate(['/vendor'])
              break;
            case User.FARMER:
              // farmer routing module farmer
              router.navigate(['/farmer'])
              break;
            default:
              router.navigate(['/'])
              break;
          }

        }

        if (conf.status == false)
          notify.info('system offline')
      }
    )
  }
}
