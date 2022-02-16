import { FarmerInvoiceService } from './../../v-data/services/farmer-invoice.service';
import { Component, OnInit } from '@angular/core';
import { FarmerInvoiceProduct } from '../../v-data/interface/FarmerInvoiceProduct';

@Component({
  selector: 'app-list-farmer-invoice',
  templateUrl: './list-farmer-invoice.component.html',
  styleUrls: ['./list-farmer-invoice.component.css']
})
export class ListFarmerInvoiceComponent implements OnInit {

  constructor(private farmerInvoiceService: FarmerInvoiceService) { }

  public invoices!: FarmerInvoiceProduct[]
  ngOnInit(): void {
    this.farmerInvoiceService.allInvoiceProduct().subscribe(data => {
      this.invoices = data.data
    })
  }

}
