import { NotifyService } from './../../../core/services/ui/notify.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, finalize, switchMap, tap } from 'rxjs';
import { StorageVendorService } from '../../v-data/services/storage-vendor.service';

@Component({
  selector: 'app-storages',
  templateUrl: './storages.component.html',
  styleUrls: ['./storages.component.css']
})
export class StoragesComponent implements OnInit {

  constructor(
    private notifyService: NotifyService,
    private storageService: StorageVendorService,
    private router: Router) { }


  storages: any [] = []
  submit = false


  item_submit: number = 0


  active(id: number): void {
    if (this.submit == false)
    {
      this.submit = true
      this.storageService.active(id)
      .pipe(
        finalize(() => this.submit = false),
        filter(next => next.status == true),
        tap(next => this.notifyService.success(next.message)),
        switchMap(_ => this.storageService.storages())
      )
      .subscribe(data => this.storages = data.data)
    }
  }

  not_active(id: number) {
    if (this.submit == false)
    {
      this.submit = true
      this.storageService.not_active(id)
      .pipe(
        finalize(() => this.submit = false),
        filter(next => next.status == true),
        tap(next => this.notifyService.success(next.message)),
        switchMap(_ => this.storageService.storages())
      )
      .subscribe(data => this.storages = data.data)
    }
  }


  create() {
    this.router.navigate(['vendor/dashboard/storage/created'])
  }

  ngOnInit(): void {
    this.storageService.storages().subscribe(data => {
      this.storages = data.data
    })
  }

}
