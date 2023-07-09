import { Component, Input, OnInit } from '@angular/core';
import { ReserveItem } from '../models/ReserveItem';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromAction from '../../store/reserve.action';
import ArrayStore from 'devextreme/data/array_store';
@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.component.html',
  styleUrls: ['./attendees.component.css'],
})
export class AttendeesComponent implements OnInit {
  @Input() locationId: string;
  @Input() type: string;
  Attendance: ReserveItem[] | any = [];
  store$: any;
  genderSource: ArrayStore;
  attendancePriceLine: any;
  genderTypes = [
    { value: '0', label: 'خانم' },
    { value: '1', label: 'آقا' },
  ];
  currentState: any;
  state: any;
  constructor(private store: Store<fromStore.ReserveModuleState>) {
    this.genderSource = new ArrayStore({
      key: 'value',
      data: this.genderTypes,
    });
    this.store$ = store.select<any>('reserve');
  }
  onSaved(savedData: any) {
    let item = savedData.changes[0];

    if (item.type === 'insert') {
      this.saveNew(item.data);
    }
  }
  ItemRemoved(item: any) {
    this.store.dispatch(
      fromAction.DeleteReserveItem({
        locationId: this.locationId,
        Id: item.key,
      })
    );

    this.store.dispatch(
      fromAction.SaveState({
        state: this.state,
      })
    );
  }
  saveNew(item: any) {
    let itemForSave: ReserveItem = {
      id: item.id,
      attendee: {
        id: item.attendee.id,
        gender: item.attendee.gender,
        name: item.attendee.name,
        lastName: item.attendee.lastName,
      },

      serviceLineId: this.attendancePriceLine[0].id,
      serviceLineTitle: this.attendancePriceLine[0].title,
      unitPrice: this.attendancePriceLine[0].serviceLinePrices[0].price,
      serviceQty: 1,
      serviceTypeId: this.attendancePriceLine[0].serviceTypeId,
      serviceTotal: this.attendancePriceLine[0].serviceLinePrices[0].price,
      discountPercent: 0,
      discountValue: 0,
      serviceTotalAfterDiscount: 0,
      taxPercent: 0,
      taxValue: 0,
      serviceAdvanceTotal: this.attendancePriceLine[0].serviceLinePrices[0].price,
      serviceStatus: 1,
      lom: null,
      passenger: null,
      visa: null,
      transfer: null,
      wheelchair: null,
      suite: null,
      meetingRoom: null,
      pet: null,
    };

    this.store.dispatch(
      fromAction.SaveReserveItem({
        locationId: this.locationId,
        ReserveItem: itemForSave,
      })
    );

    this.store.dispatch(
      fromAction.SaveState({
        state: this.state,
      })
    );
  }
  saveUpdate(item: any) {
    let itemForSave: ReserveItem = {
      id: item.key,
      attendee: {
        id: item.newData.attendee.id,
        gender: item.newData.attendee.gender
          ? item.newData.attendee.gender
          : item.oldData.attendee.gender,
        name: item.newData.attendee.name
          ? item.newData.attendee.name
          : item.oldData.attendee.name,
        lastName: item.newData.attendee.lastName
          ? item.newData.attendee.lastName
          : item.oldData.attendee.lastName,
      },

      serviceLineId: this.attendancePriceLine[0].id,
      serviceLineTitle: this.attendancePriceLine[0].title,
      unitPrice: this.attendancePriceLine[0].serviceLinePrices[0].price,
      serviceQty: 1,
      serviceTypeId: this.attendancePriceLine[0].serviceTypeId,
      serviceTotal: this.attendancePriceLine[0].serviceLinePrices[0].price,
      discountPercent: 0,
      discountValue: 0,
      serviceTotalAfterDiscount: 0,
      taxPercent: 0,
      taxValue: 0,
      serviceAdvanceTotal: this.attendancePriceLine[0].serviceLinePrices[0].price,
      serviceStatus: 1,
      lom: null,
      passenger: null,
      visa: null,
      transfer: null,
      wheelchair: null,
      suite: null,
      meetingRoom: null,
      pet: null,
    };

    this.store.dispatch(
      fromAction.UpdateReserveItem({
        locationId: this.locationId,
        Id: itemForSave.id ? itemForSave.id : '',
        ReserveItem: itemForSave,
      })
    );

    this.store.dispatch(
      fromAction.SaveState({
        state: this.state,
      })
    );
  }
  ngOnInit(): void {
    this.store$.subscribe((sub: any) => {
      this.state = sub.reserve;

      this.currentState = sub.reserve.trip.reserveRecords.find((data: any) => {
        return data.locationId == this.locationId;
      });
      if (this.currentState && this.currentState.reserveItem) {
        this.Attendance = this.currentState.reserveItem.filter((r: any) => {
          return r.serviceTypeId === 2;
        });
      }
      if (
        this.type === 'Departure' &&
        sub.reserve &&
        sub.reserve.departureServiceLine
      ) {
        this.attendancePriceLine = sub.reserve.departureServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 2;
          }
        );
      }
      if (
        this.type === 'Arrival' &&
        sub.reserve &&
        sub.reserve.arrivalServiceLine
      ) {
        this.attendancePriceLine = sub.reserve.arrivalServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 2;
          }
        );
      }
    });
  }
}
