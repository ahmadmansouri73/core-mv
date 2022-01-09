import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  {path: '' , loadChildren: () => import('../boot/boot.module').then(m => m.BootModule)},
  {path: 'not-found' , component: NotFoundComponent},
  {path: '**' , component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
