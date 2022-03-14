import { MenuDashboardComponent } from './farmer-dashboard/menu-dashboard/menu-dashboard.component';
import { FDashboardGuard } from './guards/f-dashboard.guard';
import { FarmerDashboardComponent } from './farmer-dashboard/farmer-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>  import('./f-auth/f-auth.module')
      .then(m => m.FAuthModule)
  },
  {
    path: '',
    canLoad:[FDashboardGuard],
    canActivate:[FDashboardGuard],
    loadChildren: () => import('./farmer-boot/farmer-boot.module')
      .then(m => m.FarmerBootModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmerRoutingModule { }
