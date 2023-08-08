import { Component, Input, OnInit } from '@angular/core';
import { ReserveItem } from '../models/ReserveItem';
import { Transfer } from '../models/Transfer';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromAction from '../../store/reserve.action';
import ArrayStore from 'devextreme/data/array_store';
import * as uuid from 'uuid';
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  @Input() locationId: string;
  @Input() type: string;
  lookupData = ['Not Started', 'Need Assistance', 'In Progress'];
  Transfers: Transfer[]=[];
  TransferServiceList: [];
  store$: any;
  transfersSource: [];
  transferPriceLine: any;

  currentState: any;
  serviceList: any;
  serviceListSource: ArrayStore<any, any>;
  state: any;
  tripId: any;
  reserveRecordId: string;
  constructor(private store: Store<fromStore.ReserveModuleState>) {
    this.store$ = store.select<any>('reserve');
  }
  // onSaved(savedData: any) {
  //   let item = savedData.changes[0];

  //   if (item.type === 'insert') {
  //     this.saveNew(item.data);
  //   }
  // }
  saveNew(item: any) {
    let itemForSave: ReserveItem = {
      id: item.id,
      attendee: {
        id: item.attendee.id,
        gender: item.attendee.gender,
        name: item.attendee.name,
        lastName: item.attendee.lastName,
      },

      serviceLineId: this.transferPriceLine[0].id,
      serviceLineTitle: this.transferPriceLine[0].title,
      unitPrice: this.transferPriceLine[0].serviceLinePrices[0].price,
      serviceQty: 1,
      serviceTypeId: this.transferPriceLine[0].serviceTypeId,
      serviceTotal: this.transferPriceLine[0].serviceLinePrices[0].price,
      discountPercent: 0,
      discountValue: 0,
      serviceTotalAfterDiscount: 0,
      taxPercent: 0,
      taxValue: 0,
      serviceAdvanceTotal: this.transferPriceLine[0].serviceLinePrices[0].price,
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

    if (this.tripId) {
      this.store.dispatch(
        fromAction.SaveBackendReserveItem({
          reserveRecordId: this.reserveRecordId,
          tripId: this.tripId,
          locationId: this.locationId,
          ReserveItem: itemForSave,
        })
      );
    } else {
      this.store.dispatch(
        fromAction.SaveReserveItem({
          locationId: this.locationId,
          ReserveItem: itemForSave,
        })
      );
    }

    this.store.dispatch(
      fromAction.SaveState({
        state: this.state,
      })
    );
  }
  ItemRemoved(item: any) {
    if (this.tripId) {
      this.store.dispatch(
        fromAction.DeleteReserveItemFromBackend({
          tripId: this.tripId,
          reserveRecordId: this.reserveRecordId,
          reserveItemId: item.key,
          locationId: this.locationId,
          Id: item.key,
        })
      );
    } else {
      this.store.dispatch(
        fromAction.DeleteReserveItem({
          locationId: this.locationId,
          Id: item.key,
        })
      );
    }
    this.store.dispatch(
      fromAction.SaveState({
        state: this.state,
      })
    );
  }
  formSaved(item: any){
    let newId = uuid.v4();
    let savedData = item.data;
    let transferPriceLine: any = this.TransferServiceList.find((data: any) => {
      return data.id === savedData.serviceLineId;
    });

    let itemForSave: ReserveItem = {
      id: savedData.id?savedData.id:newId,
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
      pet: null,
    };

   if( itemForSave.id){

    
    if (this.tripId) {
      this.store.dispatch(
        fromAction.UpdateBackendReserveItem({
          reserveRecordId: this.reserveRecordId,
          tripId: this.tripId,
          locationId: this.locationId,
          Id: itemForSave.id ? itemForSave.id : '',
          ReserveItem: itemForSave,
        })
      );
    } else {
      this.store.dispatch(
        fromAction.UpdateReserveItem({
          locationId: this.locationId,
          Id: itemForSave.id ? itemForSave.id : '',
          ReserveItem: itemForSave,
        })
      );
    }
   
    
    }else{




      if (this.tripId) {
        this.store.dispatch(
          fromAction.SaveBackendReserveItem({
            reserveRecordId: this.reserveRecordId,
            tripId: this.tripId,
            locationId: this.locationId,
            ReserveItem: itemForSave,
          })
        );
      } else {
        this.store.dispatch(
          fromAction.SaveReserveItem({
            locationId: this.locationId,
            ReserveItem: itemForSave,
          })
        );
      }
    }
    this.store.dispatch(
      fromAction.SaveState({
        state: this.state,
      })
    );
  }
  ngOnInit(): void {
    this.store$.subscribe((sub: any) => {
      this.tripId = sub.reserve.trip.id;
      this.state = sub.reserve;

      if (
        this.type === 'Departure' &&
        sub.reserve &&
        sub.reserve.departureServiceLine
      ) {
        this.TransferServiceList = sub.reserve.departureServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 3;
          }
        );
      }
      if (
        this.type === 'Arrival' &&
        sub.reserve &&
        sub.reserve.arrivalServiceLine
      ) {
        this.TransferServiceList = sub.reserve.arrivalServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 3;
          }
        );
      }

      this.state = sub.reserve;

      this.currentState = sub.reserve.trip.reserveRecords.find((data: any) => {
        return data.locationId == this.locationId;
      });

      this.reserveRecordId=this.currentState.id;
      if (this.currentState && this.currentState.reserveItems) {
        this.Transfers = this.currentState.reserveItems
          .filter((r: any) => {
            return r.serviceTypeId === 3;
          })
          .map((data: any) => ({
            id: data.id,
            address: data.transfer.address,
            time: data.transfer.time,
            mobileNumber: data.transfer.mobileNumber,
            description: data.transfer.description,
            serviceLineId: data.serviceLineId,
          }));
      }

      // this.Transfers = sub.reserve.ReserveItem.filter((r: any) => {
      //   return r.serviceTypeId === 3;
      // })

      // this.transfersSource = sub.reserve.ReserveItem.filter((r: any) => {
      //   return r.serviceTypeId === 3;
      // });
    });
  }
}
