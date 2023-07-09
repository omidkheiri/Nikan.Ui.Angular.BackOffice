import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import ArrayStore from 'devextreme/data/array_store';
import { map } from 'rxjs';
import * as fromStore from '../../../../store';
import * as fromAction from './store/serviceline.action';
import * as fromAccountAction from '../../../../store/account.action';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AccountService } from '../../../../Services/account.service';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit, OnChanges {
  data: any;
  account: any;
  id$: any;
  serviceLines: any;
  accountId: any;
  constructor(
    private store: Store<fromStore.CrmModuleState>,
    private actionListener$: ActionsSubject,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {
    this.store.select<any>('CRM').subscribe((d) => {
      if (d.serviceline.locations.length > 0) {
        console.log(d.serviceline.locations);

        this.data = new ArrayStore({
          data: d.serviceline.locations,
          key: 'Id',
        });
      }
      if (d.serviceline.serviceLines.length > 0) {
        console.log(d.serviceline.serviceLines);
        this.serviceLines = d.serviceline.serviceLines;
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.accountService.getaccountIdObs().subscribe((accountId) => {
      this.accountId = accountId;
    });
  }

  ngOnInit(): void {
    this.accountService.getaccountIdObs().subscribe((accountId) => {
      this.accountId = accountId;
      this.store.dispatch(fromAction.loadLocations({ payload: accountId }));

      this.store.dispatch(fromAction.loadServiceLines({ payload: accountId }));
    });
  }

  onfilterByLocation($event: any) {}
  onDeleteItem(id: any) {
    console.log(id);

    this.store.dispatch(
      fromAction.deleteServiceLines({
        accountId: this.accountId,
        ServiceLineId: id,
      })
    );
  }

  openUpdateing(id: any) {
    this.router.navigate(['edit', id]);
  }
  openPrices(id: any) {}
  openSchema(id: any) {}
}
