import { Router } from '@angular/router';
import { AppendSupportFruitFarmerComponent } from './../append-support-fruit-farmer/append-support-fruit-farmer.component';
import { MatDialog } from '@angular/material/dialog';
import { CityService } from './../../../core/services/city.service';
import { ProvinceService } from './../../../core/services/province.service';
import { NotifyService } from './../../../core/services/ui/notify.service';
import { FarmerService } from './../../v-data/services/farmer.service';
import { Subject, filter, delay, switchMap, tap, Observable, of } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-append-farmer',
  templateUrl: './append-farmer.component.html',
  styleUrls: ['./append-farmer.component.css']
})
export class AppendFarmerComponent implements OnInit {

  constructor(
    private farmerService: FarmerService,
    private notifyService: NotifyService,
    private ProvinceService: ProvinceService,
    private cityService: CityService,
    public dialog: MatDialog,
    private router: Router


  ) { }


  provinces: any []= []
  cities: any[]= []

  submit(): void {

    let item_support: any[] = [];
    let data = this.form.value
    if (this.form.valid)
    {

      if (this.support_fruit.length != 0) {
        this.support_fruit.map(data => {
          item_support.push({
            category_id: data.category.id_category,
            fruit_category_id:  data.fruit_category.id_fruit_category
          })
        })
        data['SupportFruitFarmer'] = item_support ;

      }


      this.farmerService.created(data).subscribe(data => {
        this.notifyService.success(data.message)
        this.router.navigate(['/vendor/dashboard/farmer'])
      })
    }
  }


  remove_fruit(id_fruit_category: number) {
    this.support_fruit =  this.support_fruit.filter(data => data.fruit_category.id_fruit_category != id_fruit_category)
  }


  support_fruit_append() {
    let ref =  this.dialog.open(AppendSupportFruitFarmerComponent , {
      width: '100%',

    })

    ref.afterClosed().subscribe(data => {

      if (data)
      {
        console.log(data);

        let find = this.support_fruit.find(s => data.fruit_category.id_fruit_category == s.fruit_category.id_fruit_category)


        if (find) {
          this.notifyService.info('shoma in miveh sabt kardin')
        }
        else
        {
          this.support_fruit.push(data)
        }
      }
    })
  }

  form = new FormGroup({
    full_name: new FormControl(null , Validators.required),
    call_number: new FormControl(null, Validators.pattern(/^0\d{2}\d{8}$/)),
    address: new FormControl(null),
    city_id: new FormControl(null),
    province_id: new FormControl(null),
  })


  support_fruit: any[] = []




  ngOnInit(): void {
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

    this.ProvinceService.provinces.subscribe(data => this.provinces = data.data)
  }

}
