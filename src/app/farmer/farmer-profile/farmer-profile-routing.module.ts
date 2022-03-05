import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { IndexProfileComponent } from './index-profile/index-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '' , component: IndexProfileComponent},
  {path: 'update' , component: UpdateProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmerProfileRoutingModule { }
