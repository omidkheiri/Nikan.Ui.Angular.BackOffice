import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import ArrayStore from 'devextreme/data/array_store';
import { Location } from '@angular/common';

import * as fromStore from '../../../../../store';
import * as fromAction from '../store/serviceline.action';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { ServiceLine } from '../models/service-line.model';
import { AccountService } from '../../../../../Services/account.service';
@Component({
  selector: 'app-service-line-edit',
  templateUrl: './service-line-edit.component.html',
  styleUrls: ['./service-line-edit.component.css'],
})
export class ServiceLineEditComponent implements OnInit, OnDestroy {
  serviceTypes: any;
  serviceLocations: any;
  serviceLineForm = new FormGroup({
    title: new FormControl('', Validators.required),
    taxInclude: new FormControl(0, Validators.required),
    serviceLocationId: new FormControl('', Validators.required),
    serviceTypeId: new FormControl('', Validators.required),
    financialCode: new FormControl('', Validators.required),
    id: new FormControl(''),
    financialTitle: new FormControl('', [Validators.required]),
    noneNative: new FormControl(false, Validators.required),
    serviceLineStatus: new FormControl(0, Validators.required),
  });
  editMode: any;
  id: any;
  accountId: any;
  servicelineStor$: any;
  constructor(
    private store: Store<fromStore.CrmModuleState>,
    private _location: Location,
    private route: ActivatedRoute,
    private AccountService: AccountService
  ) {
    route.params.subscribe((params: Params) => {
      this.id = params['serviceLineId'];
      this.editMode = params['serviceLineId'] != null;
    });
    this.AccountService.getAccountIdObs().subscribe(
      (accountId) => (this.accountId = accountId)
    );
    this.store.dispatch(fromAction.loadServiceType());
    this.servicelineStor$ = this.store.select<any>('CRM');
  }
  ngOnDestroy(): void {
    this.servicelineStor$ = null;
  }

  ngOnInit(): void {
    this.servicelineStor$.subscribe((sub: any) => {
      if (sub.serviceline.locations.length > 0) {
        this.serviceLocations = new ArrayStore({
          data: sub.serviceline.locations,
          key: 'Id',
        });
      }
      if (sub.serviceline.serviceTypes) {
        this.serviceTypes = new ArrayStore({
          data: sub.serviceline.serviceTypes,
          key: 'Id',
        });
      }
    });
    if (this.id) {
      this.store.dispatch(
        fromAction.loadServiceLine({
          accountId: this.accountId,
          serviceLineId: this.id,
        })
      );
    }
    this.initForm();
  }
  SubmitFrom() {
    if (!this.serviceLineForm.valid) {
      return;
    }
    var item: ServiceLine = {
      title: this.serviceLineForm.value.title,
      serviceLineStatus: this.serviceLineForm.value.serviceLineStatus ? 1 : 0,
      taxInclude: this.serviceLineForm.value.taxInclude,
      serviceLocationId: this.serviceLineForm.value.serviceLocationId,
      serviceTypeId: this.serviceLineForm.value.serviceTypeId,
      financialCode: this.serviceLineForm.value.financialCode,
      financialTitle: this.serviceLineForm.value.financialTitle,
      noneNative: this.serviceLineForm.value.noneNative,
    };
    if (this.editMode) {
      this.store.dispatch(
        fromAction.updateServiceLineStart({
          accountId: this.accountId,
          serviceLineId: this.id,
          serviceLine: item,
        })
      );
    } else {
      this.store.dispatch(
        fromAction.saveServiceLineStart({
          accountId: this.accountId,
          Item: item,
        })
      );
    }
    this.oncancel();
  }

  private initForm() {
    if (this.editMode) {
      this.servicelineStor$
        .pipe(map((serviceLine) => serviceLine))
        .subscribe((sl: any) => {
          let serviceLine = sl.serviceline.currentServiceLine;
          this.serviceLineForm = new FormGroup({
            title: new FormControl(serviceLine.title, Validators.required),
            taxInclude: new FormControl(
              serviceLine.taxInclude,
              Validators.required
            ),
            serviceLocationId: new FormControl(
              serviceLine.serviceLocationId,
              Validators.required
            ),
            serviceTypeId: new FormControl(
              serviceLine.serviceTypeId,
              Validators.required
            ),
            financialCode: new FormControl(
              serviceLine.financialCode,
              Validators.required
            ),
            id: new FormControl(this.id),
            financialTitle: new FormControl(serviceLine.financialTitle, [
              Validators.required,
            ]),
            noneNative: new FormControl(
              serviceLine.noneNative,
              Validators.required
            ),
            serviceLineStatus: new FormControl(
              serviceLine.serviceLineStatus,
              Validators.required
            ),
          });
        });
    }
  }
  oncancel() {
    this._location.back();
  }
}
