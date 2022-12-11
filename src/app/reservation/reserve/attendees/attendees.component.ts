import { Component, OnInit } from '@angular/core';
import { ReserveItem } from '../models/reserve.model';
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
  Attendance: ReserveItem[];
  store$: any;
  genderSource: ArrayStore;
  attendancePricelLine: any;
  genderTypes = [
    { value: '0', label: 'خانم' },
    { value: '1', label: 'آقا' },
  ];
  currentState: any;
  constructor(private store: Store<fromStore.ReserveModuleState>) {
    this.genderSource = new ArrayStore({
      key: 'value',
      data: this.genderTypes,
    });
    this.store$ = store.select<any>('reserve');
  }
  onSaved(saveedData: any) {
    let item = saveedData.changes[0];

    if (item.type === 'insert') {
      this.saveNew(item.data);
    }
  }
  ItemRemoved(item: any) {
    this.store.dispatch(
      fromAction.DeleteReserveItem({
        Id: item.key,
      })
    );

    this.store.dispatch(
      fromAction.SaveState({
        state: this.currentState,
      })
    );
  }
  saveNew(item: any) {
    let itemForSave: ReserveItem = {
      id: item.id,
      attendee: {
        gender: item.attendee.gender,
        name: item.attendee.name,
        lastName: item.attendee.lastName,
      },

      serviceLineId: this.attendancePricelLine.id,
      serviceLineTitle: this.attendancePricelLine.title,
      unitPrice: this.attendancePricelLine.serviceLinePrices[0].price,
      serviceQty: 1,
      serviceTypeId: this.attendancePricelLine.serviceTypeId,
      serviceTotal: this.attendancePricelLine.serviceLinePrices[0].price,
      discountPercent: 0,
      discountValue: 0,
      serviceTotalAfterDiscount: 0,
      taxPercent: 0,
      taxValue: 0,
      serviceAdvanceTotal: this.attendancePricelLine.serviceLinePrices[0].price,
      serviceStatus: 1,
    };

    this.store.dispatch(
      fromAction.SaveReserveItem({ ReserveItem: itemForSave })
    );

    this.store.dispatch(
      fromAction.SaveState({
        state: this.currentState,
      })
    );
  }
  saveUpdate(item: any) {
    let itemForSave: ReserveItem = {
      id: item.key,
      attendee: {
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

      serviceLineId: this.attendancePricelLine.id,
      serviceLineTitle: this.attendancePricelLine.title,
      unitPrice: this.attendancePricelLine.serviceLinePrices[0].price,
      serviceQty: 1,
      serviceTypeId: this.attendancePricelLine.serviceTypeId,
      serviceTotal: this.attendancePricelLine.serviceLinePrices[0].price,
      discountPercent: 0,
      discountValue: 0,
      serviceTotalAfterDiscount: 0,
      taxPercent: 0,
      taxValue: 0,
      serviceAdvanceTotal: this.attendancePricelLine.serviceLinePrices[0].price,
      serviceStatus: 1,
    };

    this.store.dispatch(
      fromAction.UpdateReserveItem({
        Id: itemForSave.id ? itemForSave.id : '',
        ReserveItem: itemForSave,
      })
    );

    this.store.dispatch(
      fromAction.SaveState({
        state: this.currentState,
      })
    );
  }
  ngOnInit(): void {
    this.store$.subscribe((sub: any) => {
      this.currentState = sub.reserve;
      if (sub.reserve.ReserveItem) {
        this.Attendance = sub.reserve.ReserveItem.filter((r: any) => {
          return r.serviceTypeId === 2;
        });
        if (sub.reserve.ServiceLine) {
          this.attendancePricelLine = sub.reserve.ServiceLine.filter(
            (r: any) => {
              return r.serviceTypeId === 2;
            }
          )[0];
        }
      }
    });
  }
}
