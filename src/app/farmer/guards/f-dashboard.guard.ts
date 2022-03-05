import { UserTypeService } from './../../core/services/user-type.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FDashboardGuard implements CanActivate , CanLoad{

constructor(
  private authservice: AuthService,
  private userTypeService: UserTypeService,
  private router: Router
  ){}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this._auth$
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._auth$;
  }


  private get _auth$(): Observable<any>{
    return this.authservice.observableAttempAuth.pipe(tap(data => {


      if (data == false || this.userTypeService.getType()?.id_type != UserTypeService.FARMER  || this.authservice.isLogin == false)
      {
        this.router.navigate(['/farmer/auth'])
      }

      return data
    }))
  }



}
