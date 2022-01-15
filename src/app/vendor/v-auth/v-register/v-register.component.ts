import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounce, debounceTime, filter, map, switchMap, tap } from 'rxjs';
import { CityService } from 'src/app/core/services/city.service';
import { ProvinceService } from 'src/app/core/services/province.service';
import { BrandnameCheckingDirective } from '../../v-data/directive/brandname-checking.directive';
import { ReqisterVendorService } from '../../v-data/services/reqister-vendor.service';

@Component({
  selector: 'app-v-register',
  templateUrl: './v-register.component.html',
  styleUrls: ['./v-register.component.css']
})
export class VRegisterComponent implements OnInit {


  provinces: any[] = []
  cities: any[] = []
  constructor(
    private registerService: ReqisterVendorService,
    private provinceService: ProvinceService,
    private cityService: CityService,
    private router:Router,
  ) { }


  form: FormGroup = new FormGroup({
    address: new FormControl(null , Validators.required),
    brand_name: new FormControl(null , Validators.required ),
    office_phone: new FormControl(null , [Validators.required , Validators.pattern(/^(\+98|0)?\d{11}$/),Validators.pattern(/^\d+$/) ]),
    city_id: new FormControl(null , Validators.required),
    province_id: new FormControl(null , Validators.required),
    owner_first_name: new FormControl(null , Validators.required),
    owner_last_name: new FormControl(null , Validators.required),
    owner_call_number: new FormControl(null , Validators.required),
    code: new FormControl(null),
  })


  checking =  new FormControl(null)



  subject_Valid = new FormControl()





  changeCallNumber(): void {
    this.subject_Valid.setValue(false)
  }

  callNumberConfirm(): void {
    if (this.form.valid)
      this.registerService.callNumberConfirm(this.form.get("owner_call_number")?.value)
        .pipe(filter(next => next.status == true))
        .subscribe( _ => {
          this.subject_Valid.setValue(true)
          this.form.controls['code'].enable()
        })
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
    this.form.controls['code'].disable();

    this.form.controls['brand_name'].valueChanges.pipe(
      tap(_ => this.checking.setValue(null)),
      debounceTime(300),
      filter((data: string) => data.trim() != ''), 
      switchMap((next: string) => this.registerService.checkingExistBrandName(next))
    ).subscribe((data: boolean) => this.checking.setValue(data))



    this.subject_Valid.valueChanges
      .pipe(
        filter(data => data == false && this.form.valid),
        tap( _ => this.form.get('code')?.setValue(null))
      )
      .subscribe()


      this.provinceService.provinces.subscribe(data => {
        this.provinces = data.data
      })


      this.form.get('province_id')?.valueChanges
        .pipe(
          tap(_ => {
            this.cities = []
          }),
          filter(next => next != null),
          switchMap(next => this.cityService.search({province_id: next}))
        )
        .subscribe(data => {
          this.cities = data.data
        })


  }

}
