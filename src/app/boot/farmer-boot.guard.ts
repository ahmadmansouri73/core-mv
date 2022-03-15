import { NotifyService } from './../core/services/ui/notify.service';
import { UserTypeService } from './../core/services/user-type.service';
import { BootService } from './boot.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class FarmerBootGuard implements CanLoad{

  constructor(
    private bootService: BootService,
    private notifyservice: NotifyService,
    private userTypeService: UserTypeService){}



  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.bootService.boot.pipe(map(data => {

      let type_validation = true
      if (this.userTypeService.getType()  ) {
        type_validation = this.userTypeService.getType().id_type == User.FARMER
        if (type_validation == false) {
          this.notifyservice.info('app vendor is login')
        }
      }

      console.log('Type Valid: ', type_validation);

      return  data.farmer && type_validation
    }))
  }


}
