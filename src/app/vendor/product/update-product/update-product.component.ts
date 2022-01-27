import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ProductVendorService } from '../../v-data/services/product-vendor.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productVendorService: ProductVendorService) { }

    private items_submit: any = null
    categories: any[] = []
    fruits: any[] = []
    fruit_categories: any[] = []
    valueTypes: any[] = []

    is_submit = false


    step = 1 ;

  product: any = null
  form = new FormGroup({
    id_product: new FormControl(null , Validators.required),
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

  update(): void{
    if (this.form.valid) {
      this.is_submit = true
      this.productVendorService.update(this.form.value)
      .pipe(finalize(() => this.is_submit = false))
      .subscribe(data => {
        if(data.status) {
          alert(data.message)
          this.router.navigate(['/vendor/dashboard/product/index'])
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

    this.productVendorService.one(this.activatedRoute.snapshot.params['id']).subscribe(data => {
      console.log(data);
      this.product = data.data

      this.form.patchValue(data.data)
      console.log(this.form.value);

    })
  }

}
