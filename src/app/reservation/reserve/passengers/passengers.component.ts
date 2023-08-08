import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromAction from '../../store/reserve.action';
import { ReserveItem } from '../models/ReserveItem';
import { PassengerFromComponent } from './passenger-from/passenger-from.component';
@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css'],
})
export class PassengersComponent implements OnInit {
  @ViewChild('passengerForm') passengerForm: PassengerFromComponent;
  @Input() locationId: string;
  @Input() type: string;
  store$: any;
  passenger: ReserveItem[];
  reserveRecord: any;
  PassengerServiceList: any;
  currentState: any;
  serviceList: any;
  serviceListVisa: any;
  serviceListWheelchair: any;
  serviceListLOM: any;
  tripId: any = '';
  reserveRecordId: any;
  constructor(private store: Store<fromStore.ReserveModuleState>) {
    this.store$ = store.select<any>('reserve');
  }
  genderTypes = [
    { value: 0, label: 'خانم' },
    { value: 1, label: 'آقا' },
  ];
  priceColumn_customizeText(cellInfo: any) {
    return cellInfo.value === 0 ? 'خانم' : 'آقا';
  }
  cloneIconClick(event: any) {}
  ngOnInit(): void {
    this.store$.subscribe((sub: any) => {
      this.tripId = sub.reserve.trip.id;

      this.reserveRecord = sub.reserve.trip.reserveRecords.find((data: any) => {
        return data.locationId == this.locationId;
      });
      if (this.reserveRecord && this.reserveRecord.reserveItems) {
        this.reserveRecordId = this.reserveRecord.id;

        console.log(this.reserveRecord.reserveItems);

        this.passenger = this.reserveRecord.reserveItems
          .filter((r: any) => {
            return r.serviceTypeId === 1;
          })
          .map((data: any) => ({
            id: data.id,
            name: data.passenger.name,
            lastName: data.passenger.lastName,
            gender: +data.passenger.gender,
            nationalCode: data.passenger.nationalCode,
            passportNumber: data.passenger.passportNumber,
            passportExpireDate: data.passenger.passportExpireDate,
            visa: data.passenger.visa ? data.passenger.visa : false,
            wheelchair: data.passenger.wheelchair
              ? data.passenger.wheelchair
              : false,
            lom: data.passenger.lom ? data.passenger.lom : false,
            birthDate: data.passenger.birthDate,
            nationality: data.passenger.nationality,
          }));
      }
      this.currentState = sub.reserve;
      if (
        this.type === 'Departure' &&
        sub.reserve &&
        sub.reserve.departureServiceLine
      ) {
        this.serviceList = sub.reserve.departureServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 1;
          }
        );
        this.serviceListVisa = sub.reserve.departureServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 5;
          }
        );
        this.serviceListLOM = sub.reserve.departureServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 9;
          }
        );
        this.serviceListWheelchair = sub.reserve.departureServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 8;
          }
        );
      }
      if (
        this.type === 'Arrival' &&
        sub.reserve &&
        sub.reserve.arrivalServiceLine
      ) {
        this.serviceList = sub.reserve.arrivalServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 1;
          }
        );
        this.serviceListVisa = sub.reserve.arrivalServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 5;
          }
        );
        this.serviceListWheelchair = sub.reserve.arrivalServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 8;
          }
        );
        this.serviceListLOM = sub.reserve.arrivalServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 9;
          }
        );
      }
    });
  }
  ItemRemoved(item: any){
   

    this.store.dispatch(
      fromAction.DeleteReserveItemFromBackend({
        tripId: this.tripId,
        reserveRecordId: this.reserveRecordId,
        reserveItemId: item.key,
        locationId: this.locationId,
        Id: item.key,
      })
    );

    this.store.dispatch(
      fromAction.SaveState({
        state: this.reserveRecord,
      })
    );
  }
  delete(id: any) {

    this.store.dispatch(
      fromAction.DeleteReserveItem({ locationId: this.locationId, Id: id })
    );
    // this.store.dispatch(
    //   fromAction.DeleteReserveItemFromBackend({
    //     tripId: this.tripId,
    //     reserveRecordId: this.reserveRecordId,
    //     reserveItemId: id.key,
    //   })
    // );

    this.store.dispatch(
      fromAction.SaveState({
        state: this.reserveRecord,
      })
    );
  }
}
