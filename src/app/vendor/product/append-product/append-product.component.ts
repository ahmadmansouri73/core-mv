import { NotifyService } from './../../../core/services/ui/notify.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, filter, switchMap, tap } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { FruitCategoriesService } from 'src/app/core/services/fruit-categories.service';
import { FruitsService } from 'src/app/core/services/fruits.service';
import { ImageCompressorService } from 'src/app/core/services/image-compressor.service';
import { ImageUploadingService } from 'src/app/core/services/image-uploading.service';
import { ValueTypeService } from 'src/app/core/services/value-type.service';
import { ConvertNumber } from 'src/app/shared/class/ConverNumber';
import { ProductVendorService } from '../../v-data/services/product-vendor.service';

@Component({
  selector: 'app-append-product',
  templateUrl: './append-product.component.html',
  styleUrls: ['./append-product.component.css']
})
export class AppendProductComponent implements OnInit {

  constructor(
    private imageCompressorService: ImageCompressorService,
    private imageUpdateService: ImageUploadingService,
    private notifyService: NotifyService,
    private router: Router,
    private categoriesService: CategoriesService,
    private fruitCategoryService: FruitCategoriesService,
    private fruitService: FruitsService,
    private valueTypeSerivce: ValueTypeService,
    private productVendorService: ProductVendorService) { }


  private items_submit: any = null
  categories: any[] = []
  fruits: any[] = []
  fruit_categories: any[] = []
  valueTypes: any[] = []

  is_submit = false


  step = 1 ;

  form = new FormGroup({
    product_name: new FormControl(null, Validators.required),
    category: new FormControl(null , Validators.required),
    fruit_category: new FormControl(null , Validators.required),
    fruit: new FormControl(null , Validators.required),
    value_type: new FormControl(null , Validators.required),
    product_price: new FormControl(null , Validators.required),
    value: new FormControl(null , Validators.required),
    discount: new FormControl(null),
    logo_address_image: new FormControl(null),
    image_address: new FormControl(null)
  })


  checkingValue() {

    console.log(this.form.value);


    if (this.form.valid) {
      this.items_submit = {
        product_name: this.form.value['product_name'],
        category_id: this.form.value['category'].id_category,
        fruit_category_id: this.form.value['fruit_category'].id_fruit_category,
        fruit_id: this.form.value['fruit'].id_fruit,
        value_type_id: this.form.value['value_type'].id,
        product_price: ConvertNumber.arabicToEnglish(this.form.value['product_price'].toString()),
        value: ConvertNumber.arabicToEnglish(this.form.value['value'].toString()),
        discount: ConvertNumber.arabicToEnglish( this.form.value['discount']|| ''),
        logo_address_image: this.imageUpdateService.base64ImageEncoder( this.form.value['logo_address_image']?.image || ''),
        image_address: this.imageUpdateService.base64ImageEncoder(this.form.value['image_address']?.image || '')
      }
      console.log(this.items_submit );
      this.step = 2
    }
  }


  submit(): void {
    if (this.form.valid) {
      console.log(this.items_submit);
      this.productVendorService.append(this.items_submit).subscribe(data => {
        if (data.status) {
          this.notifyService.success(data.message)
          this.router.navigate(['/vendor/dashboard/product'])
        }
      })
    }
  }


  setFileImage(event: {image: string , size: number}) {
    this.form.controls['image_address'].setValue(event)

  }

  setFileLogo(event: {image: string , size: number}) {
    this.form.controls['logo_address_image'].setValue(event)
  }


  ngOnInit(): void {

    combineLatest(this.valueTypeSerivce.valueTypes , this.categoriesService.categories).subscribe(([values , categories]) => {
      this.categories = categories.data
      this.valueTypes = values.data
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
