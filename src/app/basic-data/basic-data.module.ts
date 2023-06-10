import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightNumbersComponent } from './flight-numbers/flight-numbers.component';
import { AirLinesComponent } from './air-lines/air-lines.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DxButtonModule,
  DxDateBoxModule,
  DxDropDownBoxModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
  DxSchedulerModule,
  DxScrollViewModule,
} from 'devextreme-angular';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BasicDataRoutingModule } from './basic-data-routing.module';
import { FlightNumberFromComponent } from './flight-numbers/flight-number-from/flight-number-from.component';
import { AirportComponent } from './airport/airport.component';
@NgModule({
  declarations: [
    FlightNumbersComponent,
    FlightNumberFromComponent,
    AirLinesComponent,
    FlightNumberFromComponent,
    AirportComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BasicDataRoutingModule,
    TranslateModule,
    DxButtonModule,
    DxDateBoxModule,
    DxDropDownBoxModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule, DxScrollViewModule,
    CommonModule,
  ],
})
export class BasicDataModule {}
