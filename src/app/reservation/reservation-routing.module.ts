import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ReservesComponent } from '../crm/accounts/account/supplier/reserves/reserves.component';
import { ReservationComponent } from './reservation.component';
import { ReserveListComponent } from './reserve-list/reserve-list.component';
import { PaymentComponent } from './reserve/payment/payment.component';
import { ReserveComponent } from './reserve/reserve.component';
import { PrintReserveComponent } from './reserve/print-reserve/print-reserve.component';

const routes: Routes = [
  {
    path: '',
    component: ReservationComponent,

    canActivate: [AuthGuard],
    children: [
      { path: 'ReserveList', component: ReserveListComponent },

      {
        path: 'Reserve/:locationId',
        component: ReserveComponent,
      },
      {
        path: 'Reserve/:locationId/:reserveId',
        component: ReserveComponent,
      },

      {
        path: 'Payment/:reserveId',
        component: PaymentComponent,children:[{path:"print/:reserveId",component:PrintReserveComponent}]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationRoutingModule {}
