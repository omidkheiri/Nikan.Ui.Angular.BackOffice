import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { Account } from 'src/app/crm/model/account.model';
import {
  loadLocations,
  setLocationList,
} from '../../../../store/location/location.action';
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent implements OnInit {
  id: string = '';
  location$: Observable<Location[]> = this.store.select(
    (state) => state.locations
  );
  account$: Subscription | any;
  locations: Location[] = [];
  constructor(
    private store: Store<{ locations: any }>,
    private accontStore: Store<{ account: Account }>
  ) {
    this.account$ = this.accontStore.select('account');
    this.account$.subscribe((data: any) => {
      let acc = data.account as Account;

      if (acc.id) {
        this.store.dispatch(loadLocations({ payload: acc.id }));
      }
    });
  }

  ngOnInit(): void {
    this.store
      .select('locations')
      .pipe(map((locations) => locations))
      .subscribe((recipes: any) => {
        this.locations = recipes;
      });
  }
}
