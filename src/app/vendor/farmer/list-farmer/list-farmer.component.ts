import { Observable, switchMap, filter, map } from 'rxjs';
import { AppendSupportFruitFarmerComponent } from './../append-support-fruit-farmer/append-support-fruit-farmer.component';
import { MatDialog } from '@angular/material/dialog';
import { NotifyService } from './../../../core/services/ui/notify.service';
import { Router } from '@angular/router';
import { FarmerService } from './../../v-data/services/farmer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-farmer',
  templateUrl: './list-farmer.component.html',
  styleUrls: ['./list-farmer.component.css']
})
export class ListFarmerComponent implements OnInit {

  constructor(
    private farmerService: FarmerService,
    private Router: Router,
    private notifyService: NotifyService,
    private matDialog: MatDialog

  ) { }

  farmers: any[] = []


  open_dialog_append_fruit(id: number){
    let ref =  this.matDialog.open(AppendSupportFruitFarmerComponent)

    ref.afterClosed()
    .pipe(
      filter(next => next != null && next != undefined),
      map(data => {

        let new_data = {
          farmer_id: id,
          fruit_category_id: data.fruit_category.id_fruit_category,
          category_id: data.category.id_category
        }

        return new_data
      }),
      switchMap(next => this.appendFruit(next))
    )
    .subscribe(data => {
      this.notifyService.success(data.message)
    })
  }

  appendFruit(item: any): Observable<any> {
    return this.farmerService.crate_support_category(item)
  }

  create() {
    this.Router.navigate(['/vendor/dashboard/farmer/create-farmer'])
  }

  ngOnInit(): void {
    this.farmerService.farmers().subscribe(data => this.farmers = data.data)
  }

}
