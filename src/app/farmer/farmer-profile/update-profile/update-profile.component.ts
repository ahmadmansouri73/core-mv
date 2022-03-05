import { UserService } from './../../../core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { regex } from 'src/app/shared/regex';
import { filter, tap, switchMap } from 'rxjs';
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


  Provinces: any[] = []
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
        this.router.navigate(['./profile'])
      }
    })
  }


  ngOnInit(): void {
    this.UserService.observableUser.subscribe(data => this.form.patchValue(data))


    this.ProvinceService.provinces.subscribe(data => this.Provinces = data.data)



    this.form.controls['province_id'].valueChanges
    .pipe(
      filter(next => next != null),
      tap(_ => {
        this.cities = []
        this.form.controls['city_id'].setValue([])
      }),
      switchMap(province_id => this.CityService.search({province_id: province_id}))
    )
    .subscribe(data => {
      this.cities = data.data
    })
  }

}
