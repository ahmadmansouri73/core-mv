import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { ReqisterVendorService } from '../../v-data/services/reqister-vendor.service';

@Component({
  selector: 'app-v-register',
  templateUrl: './v-register.component.html',
  styleUrls: ['./v-register.component.css']
})
export class VRegisterComponent implements OnInit {


  constructor(private registerService: ReqisterVendorService, private router:Router) { }


  form: FormGroup = new FormGroup({
    address: new FormControl(null , Validators.required),
    brand_name_farsi: new FormControl(null , Validators.required),
    brand_name_english: new FormControl(null , Validators.required),
    call_number: new FormControl(null , Validators.required),
    city_id: new FormControl(null , Validators.required),
    province_id: new FormControl(null , Validators.required),
    owner_first_name: new FormControl(null , Validators.required),
    owner_last_name: new FormControl(null , Validators.required),
    owner_call_number: new FormControl(null , Validators.required),
    code: new FormControl(null , Validators.required),
  })


  subject_Valid = new FormControl(false)


  changeCallNumber(): void {
    this.subject_Valid.setValue(false)
  }

  callNumberConfirm(): void {
    if (this.form.get('owner_call_number')?.valid)
      this.registerService.callNumberConfirm(this.form.get("owner_call_number")?.value)
        .pipe(filter(next => next.status == true))
        .subscribe( _ => this.subject_Valid.setValue(true))
  }

  register(): void {
    if (this.form.valid) {
      this.registerService.register(this.form.value).subscribe(data => {
        if (data.status) {
          alert(data.message)
          this.router.navigate(['/vendor'])
        }
      })
    }
  }


  ngOnInit(): void {
    this.subject_Valid.valueChanges
      .pipe(
        filter(data => data == false && this.form.valid),
        tap( _ => this.form.get('code')?.setValue(null))
      )
      .subscribe()
  }

}
