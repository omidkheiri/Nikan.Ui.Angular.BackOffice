import { Component, OnInit } from '@angular/core';
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
export class ServicesComponent implements OnInit {
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
        this.data = new ArrayStore({
          data: d.serviceline.locations,
          key: 'Id',
        });
      }
      if (d.serviceline.serviceLines.length > 0) {
        this.serviceLines = d.serviceline.serviceLines;
        console.log(this.serviceLines);
      }
    });
  }

  ngOnInit(): void {
    this.accountService.getAccountIdObs().subscribe((accountid) => {
      this.store.dispatch(fromAction.loadLocations({ payload: accountid }));

      this.store.dispatch(fromAction.loadServiceLines({ payload: accountid }));
    });
  }

  onfilterByLocation($event: any) {
    console.log($event);
  }
  onDeleteItem(id: any) {}

  openUpdateing(id: any) {
    this.router.navigate(['edit', id]);
  }
  openPrices(id: any) {}
  openSchema(id: any) {}
}
