import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { ContentComponent } from './content/content.component';
import { CrmComponent } from './crm/crm.component';
import { MasterComponent } from './layouts/master/master.component';
import { SingleComponent } from './layouts/single/single.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/content',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: MasterComponent,

    children: [
      {
        path: 'content',
        component: ContentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'crm',
        loadChildren: () => import('./crm/crm.module').then((m) => m.CrmModule),
      },
      {
        path: 'basicdata',
        loadChildren: () =>
          import('./basic-data/basic-data.module').then(
            (m) => m.BasicDataModule
          ),
      },
      {
        path: 'reserve',
        loadChildren: () =>
          import('./reservation/reservation.module').then(
            (m) => m.ReservationModule
          ),
      },
    ],
  },

  {
    path: 'single',
    component: SingleComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
        // component: AuthComponent,
        // children: [{ path: 'login', component: LoginComponent }],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
