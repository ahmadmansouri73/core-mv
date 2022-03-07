
import { finalize } from 'rxjs';
import { FarmerInvoiceService } from './../../../vendor/v-data/services/farmer-invoice.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-invoice',
  templateUrl: './detail-invoice.component.html',
  styleUrls: ['./detail-invoice.component.css']
})
export class DetailInvoiceComponent implements OnInit {

  constructor(

    private activatedRoute: ActivatedRoute,
    private farmerInvoiceService: FarmerInvoiceService,

  ) { }

  loading = false
  invoice: any = undefined


  map_payment(product_id: number): any[] {
    let payments: any[] = this.invoice.paymentFarmerInvoiceProducts
    return payments.filter(data => data.farmer_invoice_product_detail_id == product_id)
  }

  private product: any
  private payment: any[] = []
  public status_show = false
  detail_payment_invoice( product: any , payments: any[]) {
    this.product = product
    this.payment = payments
    this.status_show = true
  }


  clear_payment_invoice() {
    this.product = undefined
    this.payment = []
    this.status_show = false
  }

  get_payment_invoice() {
    return {
      status: this.status_show,
      product: this.product,
      payment: this.payment
    }
  }

  ngOnInit(): void {

    this.loading = true;
    let params: any = this.activatedRoute.snapshot.params

    this.farmerInvoiceService.oneInvoiceProduct(params.id).pipe(finalize(() => this.loading = false)).subscribe(data => this.invoice = data.data)
  }

}
