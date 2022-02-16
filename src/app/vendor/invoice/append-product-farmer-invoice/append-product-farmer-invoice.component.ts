import { combineLatest, filter, tap, switchMap } from 'rxjs';
import { NotifyService } from './../../../core/services/ui/notify.service';
import { FruitsService } from 'src/app/core/services/fruits.service';
import { FruitCategoriesService } from 'src/app/core/services/fruit-categories.service';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { ValueTypeService } from 'src/app/core/services/value-type.service';
import { FarmerInvoiceService } from './../../v-data/services/farmer-invoice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-append-product-farmer-invoice',
  templateUrl: './append-product-farmer-invoice.component.html',
  styleUrls: ['./append-product-farmer-invoice.component.css']
})
export class AppendProductFarmerInvoiceComponent implements OnInit {

  constructor(
    private valueTypeService: ValueTypeService,
    private categoriesService: CategoriesService,
    private fruitCategoriesService: FruitCategoriesService,
    private fruitsService: FruitsService,
    private notifyService: NotifyService,
  ) { }


  fruits: any[] = [];
  fruit_categories: any[] =[]
  categories: any[] = []
  types: any[] = []

  @Output() item = new EventEmitter<any>()

  form = new FormGroup({
    category: new FormControl(null , Validators.required),
    fruit_category: new FormControl(null , Validators.required),
    fruit: new FormControl(null , Validators.required),
    value_type: new FormControl(null , Validators.required),
    value: new FormControl(null , Validators.required),
    count_box: new FormControl()
  })




  submit() {
    if (this.form.valid) {
      this.notifyService.success('محصول شما با موفقیت اضافه شد')
      this.item.emit(this.form.value)
    }
  }
  ngOnInit(): void {

    combineLatest(this.categoriesService.categories , this.valueTypeService.valueTypes).subscribe(([cateogries , types]) => {
      this.categories = cateogries.data
      this.types = types.data
    })



    this.form.controls['category'].valueChanges
    .pipe(
      filter(next => next != null),
      tap(_ => {
        this.fruit_categories = []
        this.fruits = []
        this.form.controls['fruit_category'].setValue(null)
        this.form.controls['fruit'].setValue(null)
      }),
      switchMap(next => this.fruitCategoriesService.search({category_id: next.id_category}))
    )
    .subscribe(data => this.fruit_categories = data.data)


    this.form.controls['fruit_category'].valueChanges
    .pipe(
      filter(next => next != null),
      tap(_ => {
        this.fruits = []
        this.form.controls['fruit'].setValue(null)
      }),
      switchMap(next => this.fruitsService.search({category_id: this.form.value.category.id_category , fruit_category_id: next.id_fruit_category }))
    )
    .subscribe(data => this.fruits = data.data)






  }

}
