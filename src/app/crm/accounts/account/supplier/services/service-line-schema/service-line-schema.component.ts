import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { Location } from '@angular/common';

import * as fromStore from '../../../../../store';
import { AccountService } from '../../../../../Services/account.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import * as fromAction from '../store/serviceline.action';
@Component({
  selector: 'app-service-line-schema',
  templateUrl: './service-line-schema.component.html',
  styleUrls: ['./service-line-schema.component.css'],
})
export class ServiceLineSchemaComponent implements OnInit, OnDestroy {
  editorOptions: JsonEditorOptions | any;
  accountId: any;
  form = new FormGroup({
    schema: new FormControl('', Validators.required),
  });
  id: string = '';
  servicelineStor$: any;
  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private store: Store<fromStore.CrmModuleState>,
    private accountService: AccountService
  ) {
    route.params.subscribe((params: Params) => {
      this.id = params['serviceLineId'];
    });
    this.accountService
      .getaccountIdObs()
      .subscribe((accountId) => (this.accountId = accountId));

    this.servicelineStor$ = this.store.select<any>('CRM');

    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
    this.accountService
      .getaccountIdObs()
      .subscribe((accountId) => (this.accountId = accountId));
  }
  submit() {
    this.store.dispatch(
      fromAction.updateServiceLineSchemaStart({
        accountId: this.accountId,
        serviceLineId: this.id,
        schema: `${JSON.stringify(this.form.controls.schema.value)}`.replaceAll(
          '"',
          "'"
        ),
      })
    );
    this.oncancel();
  }
  ngOnDestroy(): void {
    this.servicelineStor$ = null;
  }
  ngOnInit(): void {
    this.servicelineStor$.subscribe((sub: any) => {
      this.form = new FormGroup({
        schema: new FormControl(
          JSON.parse(
            sub.serviceline.currentServiceLine.serviceLineScheme.replaceAll(
              "'",
              '"'
            )
          ),
          Validators.required
        ),
      });
    });
    if (this.id) {
      this.store.dispatch(
        fromAction.loadServiceLine({
          accountId: this.accountId,
          serviceLineId: this.id,
        })
      );
    }
  }
  oncancel() {
    this._location.back();
  }
}
