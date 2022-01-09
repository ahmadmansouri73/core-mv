import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VLoginComponent } from './v-login/v-login.component';
import { VRegisterComponent } from './v-register/v-register.component';

const routes: Routes = [
  {path: ''  , redirectTo: 'login' , pathMatch: 'full'},
  {path: 'login' , component: VLoginComponent},
  {path: 'register', component: VRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VAuthRoutingModule { }
