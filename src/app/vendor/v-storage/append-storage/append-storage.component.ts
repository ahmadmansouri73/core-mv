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



  is_submit : boolean = false
  


  one = new FormGroup({
    storage_name: new FormControl(null , Validators.required)
  })

  two = new FormGroup({
    category_id: new FormControl(null , Validators.required),
    fruit_category_id: new FormControl(null , Validators.required),
    fruit_id: new FormControl(null , Validators.required)
  })

  tree = new FormGroup({
    value: new FormControl(null , Validators.required),
    value_type_id: new FormControl(null, Validators.required),
    price: new FormControl(null , Validators.required)
  })




  submit(){
    let item_submit: any  = {
      category_id : this.two.value['category_id'].id_category,
      fruit_category_id : this.two.value['fruit_category_id'].id_fruit_category,
      fruit_id : this.two.value['fruit_id'].id_fruit,
      storage_name : this.one.value['storage_name'],
      value : this.tree.value['value'],
      value_type_id : this.tree.value['value_type_id'].id,
      price : this.tree.value['price'],
    }

    this.is_submit = true
    this.storageService.append(item_submit).pipe(finalize(() => this.is_submit = false)).subscribe(_ => this.router.navigate(['vendor/dashboard/storage/storages']))
   
  }

  ngOnInit(): void {

    combineLatest( this.categoryService.categories , this.valueTypeService.valueTypes).subscribe(([categories , types]) => {
      this.categories = categories.data
      this.value_types = types.data
    })

    this.two.controls['category_id'].valueChanges
    .pipe(
      filter(next => next != null),
      tap(_ => {
        this.fruit_categories = []
        this.fruits = []
        this.two.controls['fruit_category_id'].setValue(null)
        this.two.controls['fruit_id'].setValue(null)
      }),
      switchMap(next => this.fruitCategoryService.search({category_id: next.id_category}))
    )  
    .subscribe(data => this.fruit_categories = data.data)


    this.two.controls['fruit_category_id'].valueChanges
    .pipe(
      filter(next => next != null),
      tap(_ => {
        this.fruits = []
        this.two.controls['fruit_id'].setValue(null)
      }),
      switchMap(next => this.fruitService.search({category_id: this.two.value.category_id.id_category , fruit_category_id: next.id_fruit_category }))
    )  
    .subscribe(data => this.fruits = data.data)
  
  }

}
