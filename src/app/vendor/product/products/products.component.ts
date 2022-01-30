import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, finalize, retry, switchMap, tap } from 'rxjs';
import { ProductVendorService } from '../../v-data/services/product-vendor.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductVendorService
  ) { }


  product: any[] = []
  item_submit = 0
  is_submit: boolean = false


  update(id: number) {
    this.router.navigate(['/vendor/dashboard/product/update' , id])
  }

  create() {
    this.router.navigate(['/vendor/dashboard/product/create'])
  }

  active(id: number): void {
    if (this.is_submit == false) {
      this.is_submit = true
      this.productService.active(id)
      .pipe(
        finalize(() => this.is_submit = false),
        filter(next => next.status),
        tap(_ => this.product = []),
        switchMap(next => this.productService.search()))
      .subscribe(data => {
        this.product = data.data
      })
    }
  }


  notactive(id: number) {
    if (this.is_submit == false) {
      this.is_submit = true
      this.productService.not_active(id)
      .pipe(
        finalize(() => this.is_submit = false),
        filter(next => next.status),
        tap(_ => this.product = []),
        switchMap(next => this.productService.search()))
      .subscribe(data => {
        this.product = data.data
      })
    }
  }

  ngOnInit(): void {
    this.is_submit = true
    this.productService.search(this.activatedRoute.snapshot.queryParams)
    .pipe(retry(1), finalize(() => this.is_submit = false))
    .subscribe(data => {
      this.product = data.data
    })
  }

}
