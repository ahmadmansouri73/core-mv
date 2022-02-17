import { NotifyService } from './../../../core/services/ui/notify.service';
import { Router } from '@angular/router';
import { FarmerInvoiceService } from './../../v-data/services/farmer-invoice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppendDeliveryFarmerInvoiceComponent } from './../append-delivery-farmer-invoice/append-delivery-farmer-invoice.component';
import { filter, tap } from 'rxjs';
import { AppendProductFarmerInvoiceComponent } from './../append-product-farmer-invoice/append-product-farmer-invoice.component';
import { MatDialog } from '@angular/material/dialog';
import { FarmerService } from './../../v-data/services/farmer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-farmer-invoice-product',
  templateUrl: './create-farmer-invoice-product.component.html',
  styleUrls: ['./create-farmer-invoice-product.component.css']
})
export class CreateFarmerInvoiceProductComponent implements OnInit {

  constructor(

    private matDialog: MatDialog,
    private farmerService: FarmerService,
    private farmerInvoiceService: FarmerInvoiceService,
    private router: Router,
    private notifyService: NotifyService,
    ) { }





  connections: any[] = [];
  products: any[] = []
  deliveries: any[] = []


  form = new FormGroup({
    farmer_id: new FormControl(null , Validators.required),
    date: new FormControl(null , Validators.required)
  })

  exist_fruit(item: any): boolean {

    let find  = this.products.find(data => data.fruit.id_fruit == item.fruit.id_fruit)

    if (find != undefined)
    {

      this.notifyService.info('product exist ...')
      return true
    }



    return false
  }


  delete_product(item: any): void {

    this.products = this.products.filter(data => data.fruit.id_fruit != item.fruit.id_fruit)
    this.notifyService.info('delete product')
  }


  append_product () {
    let dialog = this.matDialog.open(AppendProductFarmerInvoiceComponent , {
      width: '100%'
    })


    dialog.afterClosed()
    .pipe(

      filter(data => data != undefined && data != null && this.exist_fruit(data) == false)
    )
    .subscribe(data => {
      this.products.push(data)
      this.notifyService.success('محصول شما با موفقیت اضافه شد')
    })
  }


  delete_delivery(item: any) {
    this.deliveries = this.deliveries.filter(data => data.index != item.index)
    this.notifyService.info('delete delivery')
  }

  append_delivery () {
    let dialog = this.matDialog.open(AppendDeliveryFarmerInvoiceComponent , {
      width: '100%'
    })


    dialog.afterClosed()
    .pipe(
      filter(data => data != undefined && data != null)
    )
    .subscribe(data => {
      console.log(data , 'ahmad');

      data['index'] = this.deliveries.length
      this.deliveries.push(data)
    })
  }


  submit() {
    if (this.form.invalid) {
      this.notifyService.warning('invlid form ')
      return
    }

    if (this.products.length == 0) {
      this.notifyService.warning('plz seletion product, empty !')
      return
    }


    let item = {
      invoice: this.form.value ,
      deliveries: this.deliveries,
      products: this.products
    }

    this.farmerInvoiceService.createInvoiceProduct(item).subscribe(data => {
      if (data.status) {
        this.notifyService.success(data.message)
        this.router.navigate(['/vendor/dashboard/invoice'])
      }
    })

  }


  ngOnInit(): void {
    this.farmerService.connections().subscribe(data => {
      this.connections = data.data
    })
  }

}
