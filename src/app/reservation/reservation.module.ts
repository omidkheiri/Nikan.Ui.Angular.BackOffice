import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveListComponent } from './reserve-list/reserve-list.component';
import { ReserveComponent } from './reserve/reserve.component';
import { ReservationRoutingModule } from './reservation-routing.module';
import { FlightInfoComponent } from './reserve/flight-info/flight-info.component';
import { NavSectionComponent } from './reserve/nav-section/nav-section.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { reserveReducers, selectCrmModuleState } from './store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DxReportViewerModule } from 'devexpress-reporting-angular';
import { reserveReducer } from './store/reserve.reducer';
import { EffectsModule } from '@ngrx/effects';
import { reserveEffect } from './store/reserve.effect';
import {
  DxBulletModule,
  DxButtonModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxDropDownBoxModule,
  DxListModule,
  DxLookupModule,
  DxNumberBoxModule,
  DxPopupModule,
  DxScrollViewModule,
  DxSelectBoxModule,
  DxTemplateModule,
  DxToastModule,
} from 'devextreme-angular';
import { PassengersComponent } from './reserve/passengers/passengers.component';
import { PassengerFromComponent } from './reserve/passengers/passenger-from/passenger-from.component';
import { HttpClient } from '@angular/common/http';
import { AttendeesComponent } from './reserve/attendees/attendees.component';
import { TransferComponent } from './reserve/transfer/transfer.component';
import { PetServiceComponent } from './reserve/pet-service/pet-service.component';
import { SuiteComponent } from './reserve/suite/suite.component';
import { SuiteItemComponent } from './reserve/suite-item/suite-item.component';
import { PaymentComponent } from './reserve/payment/payment.component';
import { AddPaymentComponent } from './reserve/payment/add-payment/add-payment.component';
import { PrintReserveComponent } from './reserve/print-reserve/print-reserve.component';
import { LocationOptionsComponent } from './reserve/flight-info/location-options/location-options.component';
import { CompleteReserveComponent } from './reserve/payment/complete-reserve/complete-reserve.component';

@NgModule({
  declarations: [
    ReserveListComponent,
    ReserveComponent,
    FlightInfoComponent,
    NavSectionComponent,
    PassengersComponent,
    PassengerFromComponent,
    AttendeesComponent,
    TransferComponent,
    PetServiceComponent,
    SuiteComponent,
    SuiteItemComponent,
    PaymentComponent,
    AddPaymentComponent,
    PrintReserveComponent,
    LocationOptionsComponent,
    CompleteReserveComponent,
  ],
  imports: [
    FormsModule,
    DxButtonModule,
    DxDateBoxModule,
    DxDropDownBoxModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    DxDateBoxModule,
    CommonModule,
    ReactiveFormsModule,
    DxNumberBoxModule,
    DxListModule,
    DxLookupModule,
    DxToastModule,
    DxScrollViewModule,
    DxDataGridModule,
    ReservationRoutingModule,
    DxReportViewerModule,
    StoreModule.forFeature('reserve', reserveReducers),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class ReservationModule {}
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
