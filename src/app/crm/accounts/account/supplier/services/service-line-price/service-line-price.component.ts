import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AccountService } from 'src/app/crm/Services/account.service';
import * as fromStore from '../../../../../store';
import { ActivatedRoute, Params } from '@angular/router';
import * as fromAction from '../store/serviceline.action';
@Component({
  selector: 'app-service-line-price',
  templateUrl: './service-line-price.component.html',
  styleUrls: ['./service-line-price.component.css'],
})
export class ServiceLinePriceComponent implements OnInit {
  priceForm = new FormGroup({
    start: new FormControl(new Date(), Validators.required),
    end: new FormControl(new Date(), Validators.required),
    price: new FormControl(0, Validators.required),
  });
  id: any;
  accountId: string = '';
  servicelineStor$: any;
  serviceLine: any;
  selectedPriceId: string = '';
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
  }

  ngOnInit(): void {
    this.store.dispatch(
      fromAction.loadServiceLine({
        accountId: this.accountId,
        serviceLineId: this.id,
      })
    );
    this.servicelineStor$.subscribe((sub: any) => {
      this.serviceLine = sub.serviceline.currentServiceLine;
      this.priceForm.reset();
    });
  }
  oncancel() {
    this._location.back();
  }
  SubmitFrom() {
    let end = this.priceForm.controls.end.value;
    let start = this.priceForm.controls.start.value;

    if (new Date(end!.toString()) <= new Date(start!.toString())) {
      return;
    }
    if (
      this.checkOverlap(new Date(start!.toString()), new Date(end!.toString()))
    ) {
      return;
    }
    if (!this.priceForm.valid) {
      return;
    }
    if (this.selectedPriceId === '') {
      this.store.dispatch(
        fromAction.saveServiceLinePriceStart({
          accountId: this.accountId,
          serviceLineId: this.serviceLine.id,
          item: this.priceForm.value,
        })
      );
    } else {
      this.store.dispatch(
        fromAction.updateServiceLinePriceStart({
          accountId: this.accountId,
          serviceLineId: this.serviceLine.id,
          selectedPrice: this.selectedPriceId,
          item: this.priceForm.value,
        })
      );
    }
  }
  checkOverlap(start: Date, end: Date): boolean {
    if (
      this.serviceLine.serviceLinePrices.find((d: any) => {
        return d.start <= start && d.end > start;
      })
    ) {
      return true;
    }
    if (
      this.serviceLine.serviceLinePrices.find((d: any) => {
        return d.start <= end && d.end > end;
      })
    ) {
      return true;
    }

    return false;
  }

  setSelectedPrice(i: any) {
    var item = this.serviceLine.serviceLinePrices.find((d: any) => {
      return d.id === i;
    });
    if (item) {
      this.selectedPriceId = i;
      this.priceForm = new FormGroup({
        start: new FormControl(item.start, Validators.required),
        end: new FormControl(item.end, Validators.required),
        price: new FormControl(item.price, Validators.required),
      });
    }
  }
}
