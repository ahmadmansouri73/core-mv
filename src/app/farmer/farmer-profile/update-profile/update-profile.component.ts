import { UserService } from './../../../core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { regex } from 'src/app/shared/regex';
import { filter, tap, switchMap, delay } from 'rxjs';
import { CityService } from 'src/app/core/services/city.service';
import { ProvinceService } from 'src/app/core/services/province.service';
import { NotifyService } from './../../../core/services/ui/notify.service';
import { FarmerProfileService } from './../../services/farmer-profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {


  provinces: any[] = []
  cities: any[] = []

  constructor(
    private farmerProfileService: FarmerProfileService,
    private ProvinceService: ProvinceService,
    private CityService: CityService,
    private AuthService: AuthService,
    private UserService: UserService,
    private router: Router,

    private notifyService: NotifyService
    ) { }

  form = new FormGroup({
    province_id: new FormControl(null , Validators.pattern(regex.digit)),
    city_id: new FormControl(null , Validators.pattern(regex.digit)),
    address: new FormControl(null),
    full_name: new FormControl(null),
  })

  submit() {
    this.farmerProfileService.update(this.form.value)
    .pipe(
      filter(data => data.status == true),
      tap(data => this.notifyService.success(data.message)),
      switchMap(next => this.AuthService.attempAuth())
    )
    .subscribe(data => {
      if (data.status) {
        this.router.navigate(['/farmer/profile'])
      }
    })
  }


  ngOnInit(): void {
    this.ProvinceService.provinces.subscribe(data => this.provinces = data.data)



    this.form.controls['province_id'].valueChanges
    .pipe(
      tap(_ => {

        this.cities = []
        this.form.controls['city_id'].setValue([])
      }),
      switchMap(province_id => this.CityService.search({province_id: province_id})),
      delay(100)
    )
    .subscribe(data => {
      this.cities = data.data
    })

    this.UserService.observableUser.subscribe(data => this.form.patchValue(data))

  }

}
