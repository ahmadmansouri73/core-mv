import { finalize, switchMap, tap } from 'rxjs';
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
    this.activatedRoute.queryParams
    .pipe(tap(_ => this.loading = true), switchMap(next => this.farmerInvoiceService.invoices(next)))
    .subscribe((data: any) => {
      this.loading = false
      this.invoices = data.data
    })
  }

}
