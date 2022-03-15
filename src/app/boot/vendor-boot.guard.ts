import { NotifyService } from './../core/services/ui/notify.service';
import { UserTypeService } from './../core/services/user-type.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { BootService } from './boot.service';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class VendorBootGuard implements CanLoad , CanActivate {

  constructor(

    private bootService: BootService,
    private userTypeService: UserTypeService,
    private notifyservice: NotifyService
  ){}


  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.bootService.boot.pipe(map(data => {

      let type_validation = true
      if (this.userTypeService.getType()  ) {
        type_validation = this.userTypeService.getType().id_type == User.VENDOR


        if (type_validation == false) {
          this.notifyservice.info('app farmer is login')
        }
      }

      console.log('Type Valid: ', type_validation);

      return  data.vendor && type_validation
    }))
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.bootService.boot.pipe(map(data => {

      let type_validation = true
      if (this.userTypeService.getType()  ) {

        type_validation = this.userTypeService.getType().id_type == User.VENDOR


        if (type_validation == false) {
          this.notifyservice.info('app farmer is login')
        }

      }

      console.log('Type Valid: ', type_validation);

      return  data.vendor && type_validation
    }))
  }


}
