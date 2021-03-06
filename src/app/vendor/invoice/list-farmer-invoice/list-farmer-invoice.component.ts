import { filter, map, tap, switchMap } from 'rxjs';
import { FarmerService } from './../../v-data/services/farmer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FarmerInvoiceService } from './../../v-data/services/farmer-invoice.service';
import { Component, OnInit } from '@angular/core';
import { FarmerInvoiceProduct } from '../../v-data/interface/FarmerInvoiceProduct';

@Component({
  selector: 'app-list-farmer-invoice',
  templateUrl: './list-farmer-invoice.component.html',
  styleUrls: ['./list-farmer-invoice.component.css']
})
export class ListFarmerInvoiceComponent implements OnInit {

  constructor(
    private farmerInvoiceService: FarmerInvoiceService,
    private farmerService: FarmerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  public invoices!: FarmerInvoiceProduct[]

  public farmer: any


  public loading: boolean = false

  detail_invoice(id: number) {
    this.router.navigate(['/vendor/dashboard/invoice/detail' ,id])
  }

  create_invoice() {
    this.router.navigate(['/vendor/dashboard/invoice/create-invoice-product'])
  }

  ngOnInit(): void {



    this.activatedRoute.queryParams
    .pipe(tap(_ => this.loading = true), switchMap(next => this.farmerInvoiceService.allInvoiceProduct(next)))
    .subscribe((data: any) => {
      this.loading = false
      this.invoices = data.data
    })




    // this.farmerService.search({
    //   id_farmer: query.farmer_id
    // }).pipe(map(data => data.data) , filter((data: any[]) => data.length == 1)).subscribe(data => this.farmer = data[0])





  }

}
