import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../store';
import * as fromAction from '../store/reserve.action';
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
  constructor(
    private route: ActivatedRoute,
    private store: Store<fromStore.ReserveModuleState>
  ) {
    this.store$ = store.select<any>('reserve');
 
  }
  ngOnDestroy(): void {
    localStorage.removeItem(`reserve_${this.id}`);
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
    return;
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
        return 'Awaiting Payment';
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
    return;
  }
  ngOnInit(): void {



    this.store$.subscribe((sub) => {
      this.reserveNumber = sub.reserve.reserveNumber;
      this.Status = sub.reserve.reserveStatus;
      
      this.store.dispatch(fromAction.LoadLocation({ locationId: sub.reserve.LocationId }));
      if(sub.reserve.LocationId&&sub.reserve.LocationId.id){
      this.location = sub.reserve.LocationId;
      }
      this.item = sub.reserve.ReserveItem.find((r: any) => {
        return r.serviceTypeId === 4;
      });
    });








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
          localStorage.removeItem(`reserve_${this.id}`);
          this.store.dispatch(fromAction.ClearReserve());
          this.store.dispatch(fromAction.LoadLocation({ locationId: this.id }));
        }
      
      this.store.dispatch(fromAction.LoadLocation({ locationId: this.id }));
    });
  }
}
