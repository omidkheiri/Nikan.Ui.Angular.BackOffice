import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../store';
import * as fromAction from '../store/reserve.action';
import { Trip } from './models/Trip';
import { from } from 'jalali-moment';
@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css'],
})
export class ReserveComponent implements OnInit, OnDestroy {
  id: string;
  store$: Observable<any>;
  location: any;
  reserveId: any;
  item: any;
  reserveNumber: any;
  Status: any;
  trip: Trip | any;

  hasArrivalPassenger = false;
  hasArrivalAttendance = false;
  hasArrivalTransfer = false;
  hasArrivalPet = false;
  hasDeparturePassenger = false;
  hasDepartureAttendance = false;
  hasDepartureTransfer = false;
  hasDeparturePet = false;
  serviceListLoaded: boolean=false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromStore.ReserveModuleState>
  ) {
    this.store$ = store.select<any>('reserve');
  }
  ngOnDestroy(): void {
    localStorage.removeItem(`reserve`);
  }
  getStyle(item: any) {
    switch (item) {
      case 0:
        return 'badge badge-success';
        break;
      case 1:
        return 'badge badge-success';
        break;
      case 2:
        return 'badge badge-success';
        break;
      case 3:
        return 'badge badge-success';
        break;
      case 4:
        return 'badge badge-success';
        break;
      case 5:
        return 'badge badge-success';
        break;
      default:
        break;
    }
    return "";
  }
  getStatus(item: any) {
    switch (item) {
      case 0:
        return 'Draft';
        break;
      case 1:
        return 'Submitted';
        break;
      case 2:
        return 'Pay Waiting';
        break;
      case 3:
        return 'Paid';
        break;
      case 4:
        return 'Sent';
        break;
      case 5:
        return 'Cancelled';
        break;
      default:
        break;
    }
    return "";
  }
  ngOnInit(): void {
    this.store$.subscribe((sub) => {

      this.trip = sub.reserve.trip;

      this.reserveNumber = sub.reserve.reserveNumber;
      this.Status = sub.reserve.reserveStatus;

      this.checkServices(sub);
      if (sub.reserve.locationId && sub.reserve.locationId.id) {
        this.location = sub.reserve.locationId;
      }
    });

    if (localStorage.getItem('reserve'))
     {
     
      var reserve = localStorage.getItem('reserve') + '';

      this.store.dispatch(
        fromAction.SetStateFromStorage({ oldState: JSON.parse(reserve) })
      );
    }

    this.route.params.subscribe((params: any) => {
      if (params.reserveId) {
        this.reserveId = params.reserveId;
        this.store.dispatch(fromAction.SetReserveMode({ mode: 'edit' }));
      } else {
        this.store.dispatch(fromAction.SetReserveMode({ mode: 'new' }));
      }

      if (this.reserveId) {
        this.store.dispatch(
          fromAction.LoadReserveFromApi({ reserveId: this.reserveId })
        );
      } else {
        localStorage.removeItem(`reserve`);
        this.store.dispatch(fromAction.ClearReserve());
        //this.store.dispatch(fromAction.LoadLocation({ locationId: this.id }));
      }

      //  this.store.dispatch(fromAction.LoadLocation({ locationId: this.id }));
    });
  }
  checkServices(sub: any) {
    if (
      sub.reserve.departureServiceLine &&
      sub.reserve.departureServiceLine.length > 0
    ) {
      this.serviceListLoaded=true;
      if (
        sub.reserve.departureServiceLine.find((data: any) => {
          return data.serviceTypeId === 1;
        })
      ) {
        this.hasDeparturePassenger = true;
      } else {
        this.hasDeparturePassenger = false;
      }

      if (
        sub.reserve.departureServiceLine.find((data: any) => {
          return data.serviceTypeId === 2;
        })
      ) {
        this.hasDepartureAttendance = true;
      } else {
        this.hasDepartureAttendance = false;
      }
      if (
        sub.reserve.departureServiceLine.find((data: any) => {
          return data.serviceTypeId === 3;
        })
      ) {
        this.hasDepartureTransfer = true;
      } else {
        this.hasDepartureTransfer = false;
      }
      if (
        sub.reserve.departureServiceLine.find((data: any) => {
          return data.serviceTypeId === 4;
        })
      ) {
        this.hasDeparturePet = true;
      } else {
        this.hasDeparturePet = false;
      }
    }

    if (
      sub.reserve.arrivalServiceLine &&
      sub.reserve.arrivalServiceLine.length > 0
    ) {
      this.serviceListLoaded=true;
      if (
        sub.reserve.arrivalServiceLine.find((data: any) => {
          return data.serviceTypeId === 1;
        })
      ) {
        this.hasArrivalPassenger = true;
      } else {
        this.hasArrivalPassenger = false;
      }

      if (
        sub.reserve.arrivalServiceLine.find((data: any) => {
          return data.serviceTypeId === 2;
        })
      ) {
        this.hasArrivalAttendance = true;
      } else {
        this.hasArrivalAttendance = false;
      }
      if (
        sub.reserve.arrivalServiceLine.find((data: any) => {
          return data.serviceTypeId === 3;
        })
      ) {
        this.hasArrivalTransfer = true;
      } else {
        this.hasArrivalTransfer = false;
      }
      if (
        sub.reserve.arrivalServiceLine.find((data: any) => {
          return data.serviceTypeId === 4;
        })
      ) {
        this.hasArrivalPet = true;
      } else {
        this.hasArrivalPet = false;
      }
    }
  }
}
