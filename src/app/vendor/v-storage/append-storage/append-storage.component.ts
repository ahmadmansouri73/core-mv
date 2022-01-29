import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, filter, finalize, switchMap, tap } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { FruitCategoriesService } from 'src/app/core/services/fruit-categories.service';
import { FruitsService } from 'src/app/core/services/fruits.service';
import { ValueTypeService } from 'src/app/core/services/value-type.service';
import { StorageVendorService } from '../../v-data/services/storage-vendor.service';

@Component({
  selector: 'app-append-storage',
  templateUrl: './append-storage.component.html',
  styleUrls: ['./append-storage.component.css']
})
export class AppendStorageComponent implements OnInit {

  constructor(
    private fruitService: FruitsService,
    private fruitCategoryService: FruitCategoriesService,
    private categoryService: CategoriesService,
    private valueTypeService: ValueTypeService,
    private storageService: StorageVendorService,
    private router: Router
  ) { }


  value_types: any[] = []
  categories: any[] = []
  fruit_categories: any[] = []
  fruits: any[] = []


  step: number = 1


  is_submit : boolean = false

  form = new FormGroup({
    storage_name: new FormControl(null , Validators.required),
    category_id: new FormControl(null , Validators.required),
    fruit_category_id: new FormControl(null , Validators.required),
    fruit_id: new FormControl(null , Validators.required),
    value: new FormControl(null , Validators.required),
    value_type_id: new FormControl(null, Validators.required),
    price: new FormControl(null , Validators.required),
  })





  submit(){
    let item_submit: any  = {
      category_id : this.form.value['category_id'].id_category,
      fruit_category_id : this.form.value['fruit_category_id'].id_fruit_category,
      fruit_id : this.form.value['fruit_id'].id_fruit,
      storage_name : this.form.value['storage_name'],
      value : this.form.value['value'],
      value_type_id : this.form.value['value_type_id'].id,
      price : this.form.value['price'],
    }

    this.is_submit = true
    this.storageService.append(item_submit).pipe(finalize(() => this.is_submit = false) , filter(next => next.status == true)).subscribe(_ => this.router.navigate(['vendor/dashboard/storage/storages']))

  }

  ngOnInit(): void {

    combineLatest( this.categoryService.categories , this.valueTypeService.valueTypes).subscribe(([categories , types]) => {
      this.categories = categories.data
      this.value_types = types.data
    })

    this.form.controls['category_id'].valueChanges
    .pipe(
      filter(next => next != null),
      tap(_ => {
        this.fruit_categories = []
        this.fruits = []
        this.form.controls['fruit_category_id'].setValue(null)
        this.form.controls['fruit_id'].setValue(null)
      }),
      switchMap(next => this.fruitCategoryService.search({category_id: next.id_category}))
    )
    .subscribe(data => this.fruit_categories = data.data)


    this.form.controls['fruit_category_id'].valueChanges
    .pipe(
      filter(next => next != null),
      tap(_ => {
        this.fruits = []
        this.form.controls['fruit_id'].setValue(null)
      }),
      switchMap(next => this.fruitService.search({category_id: this.form.value.category_id.id_category , fruit_category_id: next.id_fruit_category }))
    )
    .subscribe(data => this.fruits = data.data)

  }

}
