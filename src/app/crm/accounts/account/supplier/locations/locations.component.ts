import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, ActionsSubject } from '@ngrx/store';

import { map, Observable, Subscription, take } from 'rxjs';
import * as fromAction from '../../../../store/location/location.action';
import * as fromStore from '../../../../store';
import { LocationItem } from 'src/app/crm/model/location.model';
import { AccountService } from '../../../../Services/account.service';

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
    private store: Store<fromStore.CrmModuleState>,
    private AccountService: AccountService
  ) {
    this.store
      .select<any>('CRM')
      .pipe(map((locations) => locations))
      .subscribe((location: any) => {
      
        this.locations = location.location.locations;
      });
  }

  ngOnInit(): void {
    this.AccountService.getAccountIdObs().subscribe((accountid) => {
      this.store.dispatch(fromAction.loadLocations({ payload: accountid }));
    });
  }
}
