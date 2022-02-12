import { MatDialogRef } from '@angular/material/dialog';
import { filter, tap, switchMap } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FruitCategoriesService } from './../../../core/services/fruit-categories.service';
import { CategoriesService } from './../../../core/services/categories.service';
@Component({
  selector: 'app-append-support-fruit-farmer',
  templateUrl: './append-support-fruit-farmer.component.html',
  styleUrls: ['./append-support-fruit-farmer.component.css']
})
export class AppendSupportFruitFarmerComponent implements OnInit {

  constructor(
    private categoriesService: CategoriesService,
    private fruitCategoriesService: FruitCategoriesService,
    private matDialogRef: MatDialogRef<AppendSupportFruitFarmerComponent>
  ) { }
  categories: any[] = []
  fruit_categories: any[] = []

  form = new FormGroup({
    category: new FormControl(null, Validators.required ),
    fruit_category: new FormControl(null , Validators.required ),
  })



  submit() {
    if (this.form.valid)
    {
      this.matDialogRef.close(this.form.value)
      this.form.reset()
    }
  }

  
  ngOnInit(): void {


    this.categoriesService.categories.subscribe(data => this.categories = data.data)
    this.form.controls['category'].valueChanges
    .pipe(
      filter(next => next != null),
      tap(_ => {
        this.fruit_categories = []
        this.form.controls['fruit_category'].setValue(null)
      }),
      switchMap(next => this.fruitCategoriesService.search({category_id: next.id_category}))
    )
    .subscribe(data => this.fruit_categories = data.data)

  }

}
