import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounce, debounceTime, filter, map, switchMap, tap } from 'rxjs';
import { CityService } from 'src/app/core/services/city.service';
import { ProvinceService } from 'src/app/core/services/province.service';
import { ReqisterVendorService } from '../../v-data/services/reqister-vendor.service';

@Component({
  selector: 'app-v-register',
  templateUrl: './v-register.component.html',
  styleUrls: ['./v-register.component.css']
})
export class VRegisterComponent implements OnInit {


  provinces: any[] = []
  cities: any[] = []


  step = 1


  submitStepOne = false
  submitStepTwo = false

  constructor(
    private registerService: ReqisterVendorService,
    private provinceService: ProvinceService,
    private cityService: CityService,
    private router:Router,
  ) { }


  form: FormGroup = new FormGroup({
    address: new FormControl(null , Validators.required),
    brand_name: new FormControl(null ,[ Validators.required , Validators.minLength(6)] ),
    office_phone: new FormControl(null , [Validators.required , Validators.pattern(/^0\d{2}\d{8}$/) ]),
    city_id: new FormControl(null , Validators.required),
    province_id: new FormControl(null , Validators.required),
    owner_first_name: new FormControl(null , Validators.required),
    owner_last_name: new FormControl(null , Validators.required),
    owner_call_number: new FormControl(null , [Validators.required , Validators.pattern(/09(0[1-2]|1[0-9]|3[0-9]|2[0-1])-?[0-9]{3}-?[0-9]{4}/) , Validators.pattern(/^\d+$/)]),
    code: new FormControl(null),
  })


  setCode(event:string)
  {

    this.form.controls['code'].setValue(event)
  }

  checking =  new FormControl(null)



  callNumberConfirm(): void {

    if (this.form.valid && this.submitStepOne == false)
    {
      this.submitStepOne = true
      this.registerService.callNumberConfirm(this.form.get("owner_call_number")?.value)
      .pipe(filter(next => next.status == true))
      .subscribe( _ => {

        this.step = 2
      } , error => {

      }, 
      () => {
        this.submitStepOne = false
      })
    }

  }

  submit(): void {
    if (this.form.valid && (this.form.controls['code'].value.trim().length == 6 && this.submitStepTwo == false)) {
      this.submitStepTwo = true
      this.registerService.register(this.form.value).subscribe(data => {
        if (data.status) {
          alert(data.message)
          this.router.navigate(['/vendor'])
        }
      } , error => {

      }, () => {
        this.submitStepTwo = false

      })
    }
  }




  ngOnInit(): void {

    this.form.controls['brand_name'].valueChanges.pipe(
      tap(_ => this.checking.setValue(null)),
      debounceTime(300),
      filter((data: string) => data.trim() != '' && data.length > 4), 
      switchMap((next: string) => this.registerService.checkingExistBrandName(next))
    ).subscribe((data: boolean) => this.checking.setValue(data))




      this.provinceService.provinces.subscribe(data => {
        this.provinces = data.data
      })


      this.form.get('province_id')?.valueChanges
        .pipe(
          tap(_ => {
            this.cities = []
            this.form.controls['city_id'].setValue(null)
          }),
          filter(next => next != null),
          switchMap(next => this.cityService.search({province_id: next}))
        )
        .subscribe(data => {
          this.cities = data.data
        })


  }

}
