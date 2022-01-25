import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, filter, switchMap, tap } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { FruitCategoriesService } from 'src/app/core/services/fruit-categories.service';
import { FruitsService } from 'src/app/core/services/fruits.service';
import { ValueTypeService } from 'src/app/core/services/value-type.service';
import { ProductVendorService } from '../../v-data/services/product-vendor.service';

@Component({
  selector: 'app-append-product',
  templateUrl: './append-product.component.html',
  styleUrls: ['./append-product.component.css']
})
export class AppendProductComponent implements OnInit {

  constructor(
    private router: Router,
    private categoriesService: CategoriesService,
    private fruitCategoryService: FruitCategoriesService,
    private fruitService: FruitsService,
    private valueTypeSerivce: ValueTypeService,
    private productVendorService: ProductVendorService) { }

  categories: any[] = []
  fruits: any[] = []
  fruit_categories: any[] = []
  valueTypes: any[] = []


  form = new FormGroup({
    product_name: new FormControl(null, Validators.required),
    category: new FormControl(null , Validators.required),
    fruit_category: new FormControl(null , Validators.required),
    fruit: new FormControl(null , Validators.required),
    value_type: new FormControl(null , Validators.required),

  })


  submit(): void {
    if (this.form.valid) {
      this.productVendorService.apend(this.form.value).subscribe(data => {
        if (data.status) {
          this.router.navigate(['/vendor/dashboard/product'])
        }
      })
    }
  }


  ngOnInit(): void {

    combineLatest(this.valueTypeSerivce.valueTypes , this.categoriesService.categories).subscribe(([values , categories]) => {
      this.categories = categories.data
      this.valueTypes = values.data
    })


    this.form.valueChanges.subscribe(data => console.log(data))


    this.form.controls['category'].valueChanges
    .pipe(
      filter(next => next != null),
      tap(_ => {
        this.fruit_categories = []
        this.fruits = []
        this.form.controls['fruit_category'].setValue(null)
        this.form.controls['fruit'].setValue(null)
      }),
      switchMap(next => this.fruitCategoryService.search({category_id: next.id_category}))
    )
    .subscribe(data => this.fruit_categories = data.data)


    this.form.controls['fruit_category'].valueChanges
    .pipe(
      filter(next => next != null),
      tap(_ => {
        this.fruits = []
        this.form.controls['fruit'].setValue(null)
      }),
      switchMap(next => this.fruitService.search({category_id: this.form.value.category.id_category , fruit_category_id: next.id_fruit_category }))
    )
    .subscribe(data => this.fruits = data.data)
  }

}
