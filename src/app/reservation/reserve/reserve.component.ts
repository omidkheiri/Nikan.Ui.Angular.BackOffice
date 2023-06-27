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
  trip: Trip|any;
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
console.log(sub.reserve);

this.trip=sub.reserve.trip;

      this.reserveNumber = sub.reserve.reserveNumber;
      this.Status = sub.reserve.reserveStatus;
      
     
      if(sub.reserve.LocationId&&sub.reserve.LocationId.id){
      this.location = sub.reserve.LocationId;
      }
      // this.item = sub.reserve.ReserveItem.find((r: any) => {
      //   return r.serviceTypeId === 4;
      // });
    });


if(localStorage.getItem("reserve")){
console.log(localStorage.getItem("reserve"));
var reserve=localStorage.getItem("reserve")+"";


  this.store.dispatch(fromAction.SetStateFromStorage({oldState:JSON.parse(reserve)}));

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
}
