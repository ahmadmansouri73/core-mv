import { finalize } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FarmerInvoiceService } from './../../v-data/services/farmer-invoice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-invoice',
  templateUrl: './detail-invoice.component.html',
  styleUrls: ['./detail-invoice.component.css']
})
export class DetailInvoiceComponent implements OnInit {

  constructor(
    private farmerInvoiceService: FarmerInvoiceService,
    private activatedRoute: ActivatedRoute
  ) { }


  invoice: any
  loading: boolean = false
  page: number = 1




  index_page: {page: number ,data: any} = {
    page: this.page,
    data: null
  }

  index_delivery(item: any) {
    this.index_page = {
      page: 2,
      data: item
    }
  }

  index_product(item: any) {

    let payments: any[] = this.invoice.paymentFarmerInvoiceProducts
    let filter =  payments.filter(data => data.farmer_invoice_product_detail_id == item.id_farmer_invoice_product_detail)

    this.index_page = {
      page: 3,
      data: {
        payments: filter ,
        product: item
      }
    }

  }

  index_invoice() {
    this.index_page = {
      page: 4,
      data: this.invoice
    }
  }


  update_invoice(){
    this.loading = true ;
    this.index_page =  {
      page: this.page,
      data: null
    }
    let params: any = this.activatedRoute.snapshot.params
    this.farmerInvoiceService.oneInvoiceProduct(params.id).pipe(finalize(() => this.loading = false)).subscribe(data => this.invoice = data.data)
  }


  ngOnInit(): void {
    this.loading = true ;
    let params: any = this.activatedRoute.snapshot.params
    this.farmerInvoiceService.oneInvoiceProduct(params.id).pipe(finalize(() => this.loading = false)).subscribe(data => this.invoice = data.data)
  }

}
