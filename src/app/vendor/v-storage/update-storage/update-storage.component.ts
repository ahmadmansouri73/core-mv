import { ValueTypeService } from './../../../core/services/value-type.service';
import { NotifyService } from './../../../core/services/ui/notify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageVendorService } from '../../v-data/services/storage-vendor.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-update-storage',
  templateUrl: './update-storage.component.html',
  styleUrls: ['./update-storage.component.css']
})
export class UpdateStorageComponent implements OnInit {

  constructor(
    private router: Router,
    private valueTypeService: ValueTypeService,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageVendorService,
    private notifyService: NotifyService
  ) { }


  is_submit: boolean = false
  value_types: any[] = []
  form = new FormGroup({
    value_type_id: new FormControl(null , Validators.required),
    id_vendor_storage: new FormControl(null , Validators.required),
    storage_name: new FormControl(null , Validators.required),
    price: new FormControl(null , Validators.required),
    value: new FormControl(null , Validators.required),
  })


  submit() {
    if (this.is_submit == false) {
      if (this.form.valid) {
        this.is_submit = true
        this.storageService.update(this.form.value)
        .pipe(finalize(() => this.is_submit = false))
        .subscribe(data => {
          if (data.status) {
            this.notifyService.success(data.message)
            this.router.navigate(['/vendor/dashboard/storage'])
          }
        })
      }
    }
  }
  ngOnInit(): void {
    this.valueTypeService.valueTypes.subscribe(data => {
      this.value_types = data.data
    })
    this.storageService.one(this.activatedRoute.snapshot.params['id']).subscribe(data => {
      if (data.status) {
        this.form.patchValue(data.data)
      }
    })
  }

}
