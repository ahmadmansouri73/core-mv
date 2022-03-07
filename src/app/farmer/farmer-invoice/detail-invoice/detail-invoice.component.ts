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
    private farmerInvoiceService: FarmerInvoiceService

  ) { }

  loading = false

  invoice: any = undefined
  ngOnInit(): void {

    this.loading = true;
    let params: any = this.activatedRoute.snapshot.params


    this.farmerInvoiceService.oneInvoiceProduct(params.id).pipe(finalize(() => this.loading = false)).subscribe(data => this.invoice = data.data)
  }

}
