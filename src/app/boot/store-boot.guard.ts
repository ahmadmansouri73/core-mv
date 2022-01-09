import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { BootService } from './boot.service';

@Injectable({
  providedIn: 'root'
})
export class StoreBootGuard implements CanLoad {
  constructor(private bootService: BootService){}


  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.bootService.boot.pipe(map(data => data.store))
  }



}
