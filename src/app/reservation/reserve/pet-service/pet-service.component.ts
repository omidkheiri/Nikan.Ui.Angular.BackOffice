import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromAction from '../../store/reserve.action';
import { ReserveItem } from '../models/reserve.model';
@Component({
  selector: 'app-pet-service',
  templateUrl: './pet-service.component.html',
  styleUrls: ['./pet-service.component.css'],
})
export class PetServiceComponent implements OnInit {
  @Input('item') item: any;

  store$: any;
  currentState: any;
  PetPriceList: any;
  petNumber = 0;
  constructor(private store: Store<fromStore.ReserveModuleState>) {
    this.store$ = store.select<any>('reserve');
  }

  PetNo: any;
  updatePet($event: any) {
    if (!this.PetPriceList) {
      return;
    }

    let itemForSave: ReserveItem = {
      id: this.PetPriceList[0].id,
      pet: { qty: $event.value },

      serviceLineId: this.PetPriceList[0].id,
      serviceLineTitle: this.PetPriceList[0].title,
      unitPrice: this.PetPriceList[0].serviceLinePrices[0].price,
      serviceQty: $event.value,
      serviceTypeId: this.PetPriceList[0].serviceTypeId,
      serviceTotal:
        this.PetPriceList[0].serviceLinePrices[0].price * $event.value,
      discountPercent: 0,
      discountValue: 0,
      serviceTotalAfterDiscount: 0,
      taxPercent: 0,
      taxValue: 0,
      serviceAdvanceTotal:
        this.PetPriceList[0].serviceLinePrices[0].price * $event.value,
      serviceStatus: 1,
    };

    this.store.dispatch(
      fromAction.UpdatePet({
        Id: this.PetPriceList[0].id,
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
    this.PetNo = this.item;
    this.store$.subscribe((sub: any) => {
      this.currentState = sub.reserve;
      if (sub.reserve.ServiceLine) {
        this.PetPriceList = sub.reserve.ServiceLine.filter((r: any) => {
          return r.serviceTypeId === 4;
        });
      }
    });
  }
}
