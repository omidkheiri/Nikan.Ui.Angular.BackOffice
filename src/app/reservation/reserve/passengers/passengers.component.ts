import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromAction from '../../store/reserve.action';
import { ReserveItem } from '../models/reserve.model';
@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css'],
})
export class PassengersComponent implements OnInit {
  @ViewChild('passengerForm') passengerForm: Component;
  store$: any;
  passenger: ReserveItem[];
  currentState: any;
  PasssengerServiceList: any;
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
      this.currentState = sub.reserve;
      if (sub.reserve.ReserveItem) {
        this.passenger = sub.reserve.ReserveItem.filter((r: any) => {
          return r.serviceTypeId === 1;
        }).map((data: any) => ({
          id: data.id,
          name: data.passenger.name,
          lastName: data.passenger.lastName,
          gender: +data.passenger.gender,
          nationalCode: data.passenger.nationalCode,
          passportNumber: data.passenger.passportNumber,
          passportExpireDate: data.passenger.passportExpireDate,
          visa: data.passenger.visa,
          wheelchair: data.passenger.wheelchair,
          birthDate: data.passenger.birthDate,
          nationality: data.passenger.nationality,
        }));
      }
      if (sub.reserve.ServiceLine) {
        this.PasssengerServiceList = sub.reserve.ServiceLine.filter(
          (r: any) => {
            return r.serviceTypeId === 1;
          }
        );
      }
    });
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
  delete(id: any) {
    this.store.dispatch(fromAction.DeleteReserveItem({ Id: id }));

    this.store.dispatch(
      fromAction.SaveState({
        state: this.currentState,
      })
    );
  }
}
