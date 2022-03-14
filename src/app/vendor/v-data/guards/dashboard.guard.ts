import { UserTypeService } from './../../../core/services/user-type.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate, CanLoad{

  constructor(
    private userTypeService: UserTypeService,
    private authSerivce: AuthService,
    private router: Router){}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log('vendor canLoad');

    return this.authSerivce.observableAttempAuth.pipe(map(data => {


      if (data == false || this.userTypeService.getType()?.id_type != UserTypeService.VENDOR  || this.authSerivce.isLogin == false)
      {
        this.router.navigate(['/vendor/auth'])
      }

      return data
    }))
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      return this.authSerivce.observableAttempAuth.pipe(map(data => {



        if (data == false || this.userTypeService.getType()?.id_type != UserTypeService.VENDOR )
        {
          this.router.navigate(['/vendor/auth'])
        }

        return data
      }))
  }

}
