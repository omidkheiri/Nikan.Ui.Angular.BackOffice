import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, take } from 'rxjs';
import { loadLocations } from '../../../../store/location/location.action';
import * as fromStore from '../../../../store';
import { LocationItem } from 'src/app/crm/model/location.model';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent implements OnInit {
  id$ = '';

  account$: Subscription | any;
  locations: LocationItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromStore.CrmModuleState>
  ) {
    this.store
      .select<any>('CRM')
      .pipe(map((locations) => locations))
      .subscribe((location: any) => {
        this.locations = location.location.locations;
      });
  }

  ngOnInit(): void {
    this.store.select<any>('CRM').subscribe((d) => {
      if (this.id$ !== d.account.account.id) {
        this.id$ = d.account.account.id;
        this.store.dispatch(loadLocations({ payload: this.id$ }));
      }
    });
  }
}
