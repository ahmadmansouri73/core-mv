import { finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
    private router: Router
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


  back() {
    window.history.back()
  }

  update_invoice(){
    this.index_page =  {
      page: this.page,
      data: null
    }
    this.loading = true
    this.invoice = undefined
    let params: any = this.activatedRoute.snapshot.params
    this.farmerInvoiceService.oneInvoiceProduct(params.id).pipe(finalize(() => this.loading = false)).subscribe(data => this.invoice = data.data)
  }


  delete_invoice() {
    this.router.navigate(['/vendor/dashboard/invoice'])
  }

  ngOnInit(): void {
    this.loading = true ;
    let params: any = this.activatedRoute.snapshot.params
    this.farmerInvoiceService.oneInvoiceProduct(params.id).pipe(finalize(() => this.loading = false)).subscribe(data => this.invoice = data.data)
  }

}
