import { NotifyService } from './../../../core/services/ui/notify.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, filter, finalize, switchMap, tap } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { FruitCategoriesService } from 'src/app/core/services/fruit-categories.service';
import { FruitsService } from 'src/app/core/services/fruits.service';
import { ImageUploadingService } from 'src/app/core/services/image-uploading.service';
import { ValueTypeService } from 'src/app/core/services/value-type.service';
import { ConvertNumber } from 'src/app/shared/class/ConverNumber';
import { ProductVendorService } from '../../v-data/services/product-vendor.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private imageUpdateService: ImageUploadingService,
    private categoriesService: CategoriesService,
    private fruitCategoryService: FruitCategoriesService,
    private fruitService: FruitsService,
    private notifyService: NotifyService,
    private valueTypeSerivce: ValueTypeService,
    private router: Router,
    private productVendorService: ProductVendorService) { }

    items_submit: any = null
    categories: any[] = []
    fruits: any[] = []
    fruit_categories: any[] = []
    valueTypes: any[] = []


    is_submit = false
    one_set = true
    step = 1
    logo_address_image!: string
    image_address!: string
    product: any = null


  form = new FormGroup({
    id_product: new FormControl(null , Validators.required),
    product_name: new FormControl(null, Validators.required),
    category_id: new FormControl(null , Validators.required),
    fruit_category_id: new FormControl(null , Validators.required),
    fruit_id: new FormControl(null , Validators.required),
    value_type_id: new FormControl(null , Validators.required),
    product_price: new FormControl(null , Validators.required),
    value: new FormControl(null , Validators.required),
    discount: new FormControl(null),
    logo_address_image: new FormControl(null),
    image_address: new FormControl(null)
  })

  update(): void {
    if (this.form.valid) {
      this.is_submit = true


      this.items_submit = this.form.value
      this.items_submit.product_price = ConvertNumber.arabicToEnglish(this.form.value['product_price'].toString())
      this.items_submit.value = ConvertNumber.arabicToEnglish(this.form.value['value'].toString())
      this.items_submit.discount = ConvertNumber.arabicToEnglish( this.form.value['discount'] ? this.form.value['discount'].toString() : '')
      if (this.items_submit.logo_address_image)
        this.items_submit.logo_address_image =  this.imageUpdateService.base64ImageEncoder( this.form.value['logo_address_image'])
      if (this.items_submit.image_address)
        this.items_submit.image_address =  this.imageUpdateService.base64ImageEncoder( this.form.value['image_address'])

      this.productVendorService.update(this.items_submit)
      .pipe(finalize(() => this.is_submit = false))
      .subscribe(data => {
        if(data.status) {
          this.notifyService.success(data.message)
          this.router.navigate(['/vendor/dashboard/product/index'])
        }
      })
    }
  }

  setFileImage(event: {image: string , size: number}) {
    this.form.controls['image_address'].setValue(event.image)

  }

  setFileLogo(event: {image: string , size: number}) {
    this.form.controls['logo_address_image'].setValue(event.image)
  }


  ngOnInit(): void {



    combineLatest(
      this.valueTypeSerivce.valueTypes,
      this.categoriesService.categories,
      this.productVendorService.one(this.activatedRoute.snapshot.params['id'])
      ).subscribe(([values , categories , product]) => {
      this.categories = categories.data
      this.valueTypes = values.data
      this.product = product.data

      this.form.patchValue(product.data)
      this.logo_address_image = product.data?.logo_address_image
      this.image_address = product.data?.image_address
      this.form.controls['image_address'].setValue(null)
      this.form.controls['logo_address_image'].setValue(null)
    })



    this.form.controls['category_id'].valueChanges
    .pipe(
      filter(next => next != null),
      tap(_ => {
        this.fruit_categories = []
        this.fruits = []
        if (this.one_set == false)
        {
          this.form.controls['fruit_category_id'].setValue(null)
          this.form.controls['fruit_id'].setValue(null)
        }

      }),
      switchMap(next => this.fruitCategoryService.search({category_id: next}))
    )
    .subscribe(data => this.fruit_categories = data.data)


    this.form.controls['fruit_category_id'].valueChanges
    .pipe(
      filter(next => next != null),
      tap(_ => {
        this.fruits = []
        if (this.one_set == false)
          this.form.controls['fruit_id'].setValue(null)
      }),
      switchMap(next => this.fruitService.search({category_id: this.form.value.category_id , fruit_category_id: next }))
    )
    .subscribe(data => {
      this.fruits = data.data
      this.one_set = false
    })


  }

}
