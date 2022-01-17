import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { ActiveCategoryComponent } from './active-category/active-category.component';
import { CategoryComponent } from './category/category.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CategoriesComponent,
    ActiveCategoryComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule
  ]
})
export class CategoryModule { }
