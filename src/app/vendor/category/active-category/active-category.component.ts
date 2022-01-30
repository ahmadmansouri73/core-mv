import { NotifyService } from './../../../core/services/ui/notify.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { CategoryVendorService } from '../../v-data/services/category-vendor.service';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-active-category',
  templateUrl: './active-category.component.html',
  styleUrls: ['./active-category.component.css']
})
export class ActiveCategoryComponent implements OnInit {

  constructor(private categorySrvice: CategoriesService,
    public dialogRef: MatDialogRef<ActiveCategoryComponent>,
    private notifyService: NotifyService,
    private categoryVendorService: CategoryVendorService) { }

  form = new FormGroup({
    category_id: new FormControl(null , Validators.required)
  })
  is_submit = false

  categories: any[] =[]

  submit() {
    if (this.form.valid && this.is_submit == false)
    {
      this.is_submit =true
      this.categoryVendorService.appendCategory(this.form.value.category_id).subscribe(data => {
        this.dialogRef.close(data.status)
        if(data.status)
          this.notifyService.success(data.message)
      } , err => {

      }, () => {
        this.is_submit = false
      })
    }

  }

  ngOnInit(): void {
    this.categorySrvice.categories.subscribe(data => {
      this.categories = data.data
    })
  }

}
