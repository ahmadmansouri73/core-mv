import { finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FarmerInvoiceService } from '../../services/farmer-invoice.service';

@Component({
  selector: 'app-index-invoice',
  templateUrl: './index-invoice.component.html',
  styleUrls: ['./index-invoice.component.css']
})
export class IndexInvoiceComponent implements OnInit {

  constructor(
    private farmerInvoiceService: FarmerInvoiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  invoices: any[] = []

  loading = false

  detail_invoice(id: number) {
    this.router.navigate(['/farmer/invoice/view' , id])
  }


  ngOnInit(): void {
    this.loading = true
    this.farmerInvoiceService.invoices(this.activatedRoute.snapshot.queryParams)
    .pipe(finalize(() => this.loading = false))
    .subscribe((data: any) => this.invoices = data.data)
  }

}
