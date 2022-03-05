import { Component, OnInit } from '@angular/core';
import { FarmerInvoiceService } from '../../services/farmer-invoice.service';

@Component({
  selector: 'app-index-invoice',
  templateUrl: './index-invoice.component.html',
  styleUrls: ['./index-invoice.component.css']
})
export class IndexInvoiceComponent implements OnInit {

  constructor(private farmerInvoiceService: FarmerInvoiceService) { }

  invoices: any[] = []
  ngOnInit(): void {
    this.farmerInvoiceService.invoices().subscribe((data: any) => this.invoices = data.data)
  }

}
