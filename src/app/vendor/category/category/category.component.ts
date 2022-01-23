import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { filter, switchMap } from 'rxjs';
import { CategoryVendorService } from '../../v-data/services/category-vendor.service';
import { ActiveCategoryComponent } from '../active-category/active-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryVendorService: CategoryVendorService , private dialogService: NbDialogService) { }


  public submit: boolean = false
  public item_submit: number = 0

  create() {
    this.dialogService.open(ActiveCategoryComponent , {
      closeOnEsc: true,
      hasBackdrop: true,
      autoFocus: true
    })
  }


  public active(id: number) {
    if (this.submit == false) {
      this.submit = true
      this.item_submit = id
      this.categoryVendorService.activeCategory(id)
      .pipe(filter(next => {
        if (next.status == false){
          this.submit = false
        }
        return next.status == true
      }), switchMap(_ => this.categoryVendorService.categories()))
      .subscribe(data => {
        this.categories = data.data
      }, erro => {
  
      } , () => {
        this.submit = false
        this.item_submit = 0
      })
    }
  }

  public not_active(id: number)
  {
    if (this.submit == false) {
      this.submit = true
      this.item_submit = id

      this.categoryVendorService.notActiveCategory(id)
      .pipe(filter(next => {
        if (next.status == false){
          this.submit = false
        }
        return next.status == true
      }),switchMap(_ => this.categoryVendorService.categories()))
      .subscribe(data => {
        this.categories = data.data
      }, erro => {
  
      } , () => {
        this.submit = false
        this.item_submit = 0

      })
    }
  }


  categories: any[] = []
  ngOnInit(): void {
    this.categoryVendorService.categories().subscribe(data => {
      this.categories = data.data
    })
  
  }

}
