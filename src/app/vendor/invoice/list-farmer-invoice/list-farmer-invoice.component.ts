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

  constructor(private farmerInvoiceService: FarmerInvoiceService,private activatedRoute: ActivatedRoute) { }

  public invoices!: FarmerInvoiceProduct[]
  ngOnInit(): void {
    let query: any =  this.activatedRoute.snapshot.params;

    this.farmerInvoiceService.allInvoiceProduct({
      farmer_id: query.farmer_id
    }).subscribe(data => {
      this.invoices = data.data
    })
  }

}
