import { AppendSupportFruitFarmerComponent } from './../append-support-fruit-farmer/append-support-fruit-farmer.component';
import { filter, map, switchMap, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NotifyService } from './../../../core/services/ui/notify.service';
import { Router } from '@angular/router';
import { FarmerService } from './../../v-data/services/farmer.service';
import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/core/interfaces/response';

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
    let ref =  this.matDialog.open(AppendSupportFruitFarmerComponent , {
      width: '100%'
    })

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

  appendFruit(item: any): Observable<Response<any>> {
    return this.farmerService.append_tag(item)
  }

  create() {
    this.Router.navigate(['/vendor/dashboard/farmer/create-farmer'])
  }

  remove(id: number) {
    this.farmerService.remove_connection(id).pipe(map( data => {
      if (data.status) {
        this.notifyService.info(data.message)
      }
      return data.status
    }) , filter(data => data == true), switchMap(_ => this.farmerService.connections())).subscribe(data => this.farmers = data.data)
  }


  invoice(farmer_id: number): void {
    this.Router.navigate(['/vendor/dashboard/invoice/index']  , {queryParams: {farmer_id: farmer_id}})
  }

  ngOnInit(): void {
    this.farmerService.connections().subscribe(data => this.farmers = data.data)
  }

}
