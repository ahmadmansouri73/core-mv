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

    public dialog: MatDialog,
    private router: Router


  ) { }


  provinces: any []= []
  cities: any[]= []
  farmer: any

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


      this.farmerService.connection_farmer(data).subscribe(data => {
        if (data.status)
        {
          this.notifyService.success(data.message)
          this.router.navigate(['/vendor/dashboard/farmer'])
        }

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
    full_name: new FormControl(null ),
    call_number: new FormControl(null, [
      Validators.required,
      Validators.pattern(/09(0[1-2]|1[0-9]|3[0-9]|2[0-1])-?[0-9]{3}-?[0-9]{4}/),
      Validators.pattern(/^\d+$/)
    ]),
    farmer_id: new FormControl(null),
    status_connaction: new FormControl(0)
  })


  support_fruit: any[] = []




  ngOnInit(): void {

    this.form.controls['call_number'].valueChanges
    .pipe(
      tap(_ => {
        this.farmer = undefined
        this.form.controls['status_connaction'].setValue(0)
        this.form.controls['farmer_id'].setValue(null)
      }),
      filter(_ => this.form.controls['call_number'].valid),
      delay(400),
      switchMap(next => this.farmerService.checking_exist_farmer(next)),
      filter(data => data.status == true),

    )
    .subscribe(data => {
      this.farmer = data.data
      this.form.controls['status_connaction'].setValue(1)
      this.form.controls['farmer_id'].setValue(this.farmer.id_farmer)
    })
  }

}
