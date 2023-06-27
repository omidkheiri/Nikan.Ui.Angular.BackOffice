import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromAction from '../../store/reserve.action';
import { ReserveItem } from "../models/ReserveItem";
@Component({
  selector: 'app-suite-item',
  templateUrl: './suite-item.component.html',
  styleUrls: ['./suite-item.component.css'],
})
export class SuiteItemComponent implements OnInit {
  @Input('item') Id: any;
  Suite: any;
  store$: any;
  currentState: any;
  SuitePriceItem: any = { serviceQty: 0 };
  constructor(private store: Store<fromStore.ReserveModuleState>) {
    this.store$ = store.select<any>('reserve');
  }

  updateSuite($event: any) {
    if (!this.SuitePriceItem) {
      return;
    }

    let itemForSave: ReserveItem = {
      id: this.Id.id,
      suite: { title: this.Id.title },

      serviceLineId: this.Id.id,
      serviceLineTitle: this.Id.title,
      unitPrice: this.Id.serviceLinePrices[0].price,
      serviceQty: $event.value,
      serviceTypeId: this.Id.serviceLinePrices[0].serviceTypeId,
      serviceTotal: this.Id.serviceLinePrices[0].price * $event.value,
      discountPercent: 0,
      discountValue: 0,
      serviceTotalAfterDiscount: 0,
      taxPercent: 0,
      taxValue: 0,
      serviceAdvanceTotal: this.Id.serviceLinePrices[0].price * $event.value,
      serviceStatus: 1,
      lom: null,
      passenger: null,
      visa: null,
      transfer: null,
      attendee: null,
      wheelchair: null,
      meetingRoom: null,
      pet: null
    };

    this.store.dispatch(
      fromAction.UpdateSuite({ Id: this.Id.id, ReserveItem: itemForSave })
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

      this.SuitePriceItem = sub.reserve.ServiceLine.filter((r: any) => {
        return r.Id === this.Id.id;
      });

      this.Suite = sub.reserve.ReserveItem.find((r: any) => {
        return r.serviceLineId === this.Id.id;
      });
    });
  }
}
