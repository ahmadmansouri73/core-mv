import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { CategoryVendorService } from '../../v-data/services/category-vendor.service';

@Component({
  selector: 'app-active-category',
  templateUrl: './active-category.component.html',
  styleUrls: ['./active-category.component.css']
})
export class ActiveCategoryComponent implements OnInit {

  constructor(private categorySrvice: CategoriesService, private dialogRef: NbDialogRef<ActiveCategoryComponent> , private categoryVendorService: CategoryVendorService) { }

  form = new FormGroup({
    category_id: new FormControl(null , Validators.required)
  })
  is_submit = false

  categories: any[] =[]

  submit() {
    if (this.form.valid && this.is_submit == false)
    {
      this.is_submit =true
      this.categoryVendorService.activeCategory(this.form.value.category_id).subscribe(data => {
      } , err => {
  
      }, () => {
        this.is_submit = false
        this.dialogRef.close()
      })
    }

  }

  ngOnInit(): void {
    this.categorySrvice.categories.subscribe(data => {
      this.categories = data.data
    })
  }

}
