import { Component, OnInit } from '@angular/core';
import { ReserveItem, Transfer } from '../models/reserve.model';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromAction from '../../store/reserve.action';
import ArrayStore from 'devextreme/data/array_store';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  lookupData = ['Not Started', 'Need Assistance', 'In Progress'];
  Transfers: Transfer[];
  TransferServiceList: [];
  store$: any;
  transfersSource: [];
  transferPricelLine: any;

  currentState: any;
  serviceList: any;
  serviceListSource: ArrayStore<any, any>;
  constructor(private store: Store<fromStore.ReserveModuleState>) {
    this.store$ = store.select<any>('reserve');
  }
  onSaved(saveedData: any) {
    let item = saveedData.changes[0];

    if (item.type === 'insert') {
      this.saveNew(item.data);
    }
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

      serviceLineId: this.transferPricelLine.id,
      serviceLineTitle: this.transferPricelLine.title,
      unitPrice: this.transferPricelLine.serviceLinePrices[0].price,
      serviceQty: 1,
      serviceTypeId: this.transferPricelLine.serviceTypeId,
      serviceTotal: this.transferPricelLine.serviceLinePrices[0].price,
      discountPercent: 0,
      discountValue: 0,
      serviceTotalAfterDiscount: 0,
      taxPercent: 0,
      taxValue: 0,
      serviceAdvanceTotal: this.transferPricelLine.serviceLinePrices[0].price,
      serviceStatus: 1,
      lom: null,
      passenger: null,
      visa: null,
      transfer: null,
      wheelchair: null,
      suite: null,
      meetingRoom: null,
      pet: null
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
  formSaved(item: any) {
    let savedData = item.data;
    let transferPriceLine: any = this.TransferServiceList.find((data: any) => {
      return data.id === savedData.serviceLineId;
    });

    let itemForSave: ReserveItem = {
      id: savedData.id,
      transfer: {
        id: savedData.id,
        address: savedData.address,
        time: savedData.time,
        mobileNumber: savedData.mobileNumber,
        description: savedData.description,
      },

      serviceLineId: transferPriceLine.id,
      serviceLineTitle: transferPriceLine.title,
      unitPrice: transferPriceLine.serviceLinePrices[0].price,
      serviceQty: 1,
      serviceTypeId: transferPriceLine.serviceTypeId,
      serviceTotal: transferPriceLine.serviceLinePrices[0].price,
      discountPercent: 0,
      discountValue: 0,
      serviceTotalAfterDiscount: 0,
      taxPercent: 0,
      taxValue: 0,
      serviceAdvanceTotal: transferPriceLine.serviceLinePrices[0].price,
      serviceStatus: 1,
      lom: null,
      passenger: null,
      visa: null,
      attendee: null,
      wheelchair: null,
      suite: null,
      meetingRoom: null,
      pet: null
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
      if (sub.reserve.ServiceLine) {
        this.TransferServiceList = sub.reserve.ServiceLine.filter((r: any) => {
          return r.serviceTypeId === 3;
        });
      }
      this.Transfers = sub.reserve.ReserveItem.filter((r: any) => {
        return r.serviceTypeId === 3;
      }).map((data: any) => ({
        id: data.id,
        address: data.transfer.address,
        time: data.transfer.time,
        mobileNumber: data.transfer.mobileNumber,
        description: data.transfer.description,
        serviceLineId: data.serviceLineId,
      }));

      this.transfersSource = sub.reserve.ReserveItem.filter((r: any) => {
        return r.serviceTypeId === 3;
      });
    });
  }
}
