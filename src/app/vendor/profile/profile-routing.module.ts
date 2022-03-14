import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DetailsComponent } from './details/details.component';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '' , redirectTo: 'details' , pathMatch: 'full'},
  {path: '' , component: ProfileComponent , children: [
    {path: 'details' , component: DetailsComponent},
    {path: 'reset-password' , component: ResetPasswordComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
