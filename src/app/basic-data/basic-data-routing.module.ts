import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AirLinesComponent } from './air-lines/air-lines.component';
import { BasicDataComponent } from './basic-data.component';
import { FlightNumberFromComponent } from './flight-numbers/flight-number-from/flight-number-from.component';
import { FlightNumbersComponent } from './flight-numbers/flight-numbers.component';
import { AirportComponent } from './airport/airport.component';

const routes: Routes = [
  {
    path: '',
    component: BasicDataComponent,

    canActivate: [AuthGuard],
    children: [
      {
        path: 'flights',
        component: FlightNumbersComponent,
        children: [
          { path: 'flightForm', component: FlightNumberFromComponent },
          {
            path: 'flightForm/:flightId',
            component: FlightNumberFromComponent,
          },
        ],
      },
      {
        path: 'airLines',
        component: AirLinesComponent,
      },
      {
        path: 'airports',
        component: AirportComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicDataRoutingModule {}
