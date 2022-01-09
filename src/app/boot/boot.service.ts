import { Injectable } from '@angular/core';
import { RouteConfigLoadStart, Router } from '@angular/router';
import { ReplaySubject, switchMap } from 'rxjs';
import { ConfService } from '../core/services/conf.service';

@Injectable({
  providedIn: 'root'
})
export class BootService {


  private conf = new ReplaySubject<{vendor: boolean , store: boolean}>(1)

  constructor(private router: Router, private confService: ConfService) {
    this.confService.config().subscribe(data => {
      if (data.status)
      {
        const modules = data.data.module_app
        this.conf.next({vendor: modules.vendor.status , store: modules.store.status})
      }

    })
  }

  public readonly boot = this.conf.asObservable()
}
