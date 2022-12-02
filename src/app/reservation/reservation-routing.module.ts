import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ReservesComponent } from '../crm/accounts/account/supplier/reserves/reserves.component';
import { ReservationComponent } from './reservation.component';
import { ReserveListComponent } from './reserve-list/reserve-list.component';
import { ReserveComponent } from './reserve/reserve.component';

const routes: Routes = [
  {
    path: '',
    component: ReservationComponent,

    canActivate: [AuthGuard],
    children: [
      { path: 'ReserveList', component: ReserveListComponent },
      { path: 'Reserve', component: ReserveComponent },
      {
        path: 'Reserve/:reserveId',
        component: ReserveComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationRoutingModule {}
