import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveListComponent } from './reserve-list/reserve-list.component';
import { ReserveComponent } from './reserve/reserve.component';
import { ReservationRoutingModule } from './reservation-routing.module';

@NgModule({
  declarations: [ReserveListComponent, ReserveComponent],
  imports: [CommonModule, ReservationRoutingModule],
})
export class ReservationModule {}
