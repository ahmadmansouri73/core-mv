import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CategoryVendorService } from '../../v-data/services/category-vendor.service';
import { ActiveCategoryComponent } from '../active-category/active-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryVendorService: CategoryVendorService , private dialogService: NbDialogService) { }



  create() {
    this.dialogService.open(ActiveCategoryComponent , {
      closeOnEsc: true,
      hasBackdrop: true,
      autoFocus: true
    })
  }

  categories: any[] = []
  ngOnInit(): void {
    this.categoryVendorService.activeCategories().subscribe(data => {
      this.categories = data.data
    })
  
  }

}
