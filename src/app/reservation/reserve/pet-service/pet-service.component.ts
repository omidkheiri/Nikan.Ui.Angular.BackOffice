import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromAction from '../../store/reserve.action';
import { ReserveItem } from "../models/ReserveItem";
@Component({
  selector: 'app-pet-service',
  templateUrl: './pet-service.component.html',
  styleUrls: ['./pet-service.component.css'],
})
export class PetServiceComponent implements OnInit {
  @Input('item') item: any;
  @Input() locationId:string;
  @Input() type:string;
  store$: any;
  currentState: any;
  PetPriceList: any;
  petNumber = 0;
  state: any;
  save: boolean=false;
  constructor(private store: Store<fromStore.ReserveModuleState>) {
    this.store$ = store.select<any>('reserve');
  }

  PetNo: any;
  updatePet($event: any) {
    
    if (!this.PetPriceList) {
      return;
    }
    this.save=true;
    let itemForSave: ReserveItem = {
      id: this.PetPriceList[0].id,
      pet: { qty: $event.value },

      serviceLineId: this.PetPriceList[0].id,
      serviceLineTitle: this.PetPriceList[0].title,
      unitPrice: this.PetPriceList[0].serviceLinePrices[0].price,
      serviceQty: $event.value,
      serviceTypeId: this.PetPriceList[0].serviceTypeId,
      serviceTotal: this.PetPriceList[0].serviceLinePrices[0].price * $event.value,
      discountPercent: 0,
      discountValue: 0,
      serviceTotalAfterDiscount: 0,
      taxPercent: 0,
      taxValue: 0,
      serviceAdvanceTotal: this.PetPriceList[0].serviceLinePrices[0].price * $event.value,
      serviceStatus: 1,
      lom: null,
      passenger: null,
      visa: null,
      transfer: null,
      attendee: null,
      wheelchair: null,
      suite: null,
      meetingRoom: null
    };


    this.store.dispatch(
      fromAction.UpdateReserveItem({locationId:this.locationId,
        Id: this.PetPriceList[0].id,
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
    this.PetNo = this.item;
    this.store$.subscribe((sub: any) => {
     
     
      this.state = sub.reserve;
    
      this.currentState = sub.reserve.trip.reserveRecords.find((data: any) => {
        return data.locationId == this.locationId;
      });
      if (this.currentState && this.currentState.reserveItem) {
        this.PetNo = this.currentState.reserveItem.find((r: any) => {
          return r.serviceTypeId === 4;
        });
        
        if(!this.save){
        this.petNumber=this.PetNo?this.PetNo.pet.qty:0;
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

    



    });
  }
}
