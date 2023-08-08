import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromAction from '../../store/reserve.action';
import { ReserveItem } from '../models/ReserveItem';
import { DxNumberBoxComponent } from 'devextreme-angular';
@Component({
  selector: 'app-pet-service',
  templateUrl: './pet-service.component.html',
  styleUrls: ['./pet-service.component.css'],
})
export class PetServiceComponent implements OnInit {
  @Input('item') item: any;
  @Input() locationId: string;
  @Input() type: string;
  @ViewChild('petCount') petCount: DxNumberBoxComponent;
  store$: any;
  currentState: any;
  PetPriceList: any;
  petNumber = 0;
  state: any;
  save: boolean = false;
  changed: boolean;
  submitted: any;
  tripId: any;
  reserveRecordId: string;
  constructor(private store: Store<fromStore.ReserveModuleState>) {
    this.store$ = store.select<any>('reserve');
  }

  PetNo: any;
  updatePet() {
    if (this.submitted) {
      return;
    }

    if (!this.PetPriceList) {
      return;
    }
    this.save = true;

    var reserveRecord = this.state.trip.reserveRecords.find((data: any) => {
      return data.locationId === this.locationId;
    });
    if (reserveRecord) {
      var petItem = reserveRecord.reserveItems.find((data: any) => {
        return data.serviceTypeId === 4;
      });

      if (petItem) {
        var itemId = petItem.id;

        petItem = {
          id: itemId,
          pet: { qty: this.petCount.value },

          serviceLineId: this.PetPriceList[0].id,
          serviceLineTitle: this.PetPriceList[0].title,
          unitPrice: this.PetPriceList[0].serviceLinePrices[0].price,
          serviceQty: this.petCount.value,
          serviceTypeId: this.PetPriceList[0].serviceTypeId,
          serviceTotal:
            this.PetPriceList[0].serviceLinePrices[0].price *
            this.petCount.value,
          discountPercent: 0,
          discountValue: 0,
          serviceTotalAfterDiscount: 0,
          taxPercent: 0,
          taxValue: 0,
          serviceAdvanceTotal:
            this.PetPriceList[0].serviceLinePrices[0].price *
            this.petCount.value,
          serviceStatus: 1,
          lom: null,
          passenger: null,
          visa: null,
          transfer: null,
          attendee: null,
          wheelchair: null,
          suite: null,
          meetingRoom: null,
        };

        // this.store.dispatch(
        //   fromAction.UpdateReserveItem({locationId:this.locationId,
        //     Id: this.PetPriceList[0].id,
        //     ReserveItem: petItem,
        //   })

        // );

        if (this.tripId) {
          if (petItem.serviceQty === 0) {
            this.store.dispatch(
              fromAction.DeleteReserveItemFromBackend({
                tripId: this.tripId,
                reserveRecordId: this.reserveRecordId,
                reserveItemId: itemId,
                locationId: this.locationId,
                Id: itemId,
              })
            );
          } else {
            this.store.dispatch(
              fromAction.UpdateBackendReserveItem({
                reserveRecordId: this.reserveRecordId,
                tripId: this.tripId,
                locationId: this.locationId,
                Id: itemId,
                ReserveItem: petItem,
              })
            );
          }
        } else {
          if (petItem.serviceQty === 0) {
            this.store.dispatch(
              fromAction.DeleteReserveItemFromBackend({
                tripId: this.tripId,
                reserveRecordId: this.reserveRecordId,
                reserveItemId: itemId,
                locationId: this.locationId,
                Id: itemId,
              })
            );
          } else {
            this.store.dispatch(
              fromAction.UpdateReserveItem({
                locationId: this.locationId,
                Id: itemId,
                ReserveItem: petItem,
              })
            );
          }
        }
      } else {
        let itemForSave: ReserveItem = {
          id: this.PetPriceList[0].id,
          pet: { qty: this.petCount.value },

          serviceLineId: this.PetPriceList[0].id,
          serviceLineTitle: this.PetPriceList[0].title,
          unitPrice: this.PetPriceList[0].serviceLinePrices[0].price,
          serviceQty: this.petCount.value,
          serviceTypeId: this.PetPriceList[0].serviceTypeId,
          serviceTotal:
            this.PetPriceList[0].serviceLinePrices[0].price *
            this.petCount.value,
          discountPercent: 0,
          discountValue: 0,
          serviceTotalAfterDiscount: 0,
          taxPercent: 0,
          taxValue: 0,
          serviceAdvanceTotal:
            this.PetPriceList[0].serviceLinePrices[0].price *
            this.petCount.value,
          serviceStatus: 1,
          lom: null,
          passenger: null,
          visa: null,
          transfer: null,
          attendee: null,
          wheelchair: null,
          suite: null,
          meetingRoom: null,
        };
        if (this.tripId) {
          this.store.dispatch(
            fromAction.UpdateBackendReserveItem({
              reserveRecordId: this.reserveRecordId,
              tripId: this.tripId,
              locationId: this.locationId,
              Id: this.PetPriceList[0].id,
              ReserveItem: itemForSave,
            })
          );
        } else {
          this.store.dispatch(
            fromAction.UpdateReserveItem({
              locationId: this.locationId,
              Id: this.PetPriceList[0].id,
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
    }
  }

  ngOnInit(): void {
    this.PetNo = this.item;
    this.store$.subscribe((sub: any) => {
      this.state = sub.reserve;
      this.tripId = sub.reserve.trip.id;
      this.currentState = sub.reserve.trip.reserveRecords.find((data: any) => {
        return data.locationId == this.locationId;
      });
      if (this.currentState && this.currentState.reserveItems) {
        this.reserveRecordId = this.currentState.id;
        this.PetNo = this.currentState.reserveItems.find((r: any) => {
          return r.serviceTypeId === 4;
        });

        if (!this.save) {
          this.petNumber = this.PetNo ? this.PetNo.pet.qty : 0;
        }
      }

      if (
        this.type === 'Departure' &&
        sub.reserve &&
        sub.reserve.departureServiceLine
      ) {
        this.PetPriceList = sub.reserve.departureServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 4;
          }
        );
      }
      if (
        this.type === 'Arrival' &&
        sub.reserve &&
        sub.reserve.arrivalServiceLine
      ) {
        this.PetPriceList = sub.reserve.arrivalServiceLine.filter(
          (data: any) => {
            return data.serviceTypeId === 4;
          }
        );
      }
      if (this.submitted) {
        this.submitted = false;
      }
    });
  }
}
