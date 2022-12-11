import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import ArrayStore from 'devextreme/data/array_store';
import { ReserveItem } from '../models/reserve.model';
import * as fromStore from '../../store';
import * as fromAction from '../../store/reserve.action';
@Component({
  selector: 'app-suite',
  templateUrl: './suite.component.html',
  styleUrls: ['./suite.component.css'],
})
export class SuiteComponent implements OnInit {
  Suites: ReserveItem[];
  store$: any;
  genderSource: ArrayStore;
  attendancePricelLine: any;

  currentState: any;
  SutiePriceList: any;
  constructor(private store: Store<fromStore.ReserveModuleState>) {
    this.store$ = store.select<any>('reserve');
  }

  ngOnInit(): void {
    this.store$.subscribe((sub: any) => {
      this.currentState = sub.reserve;
      if (sub.reserve.ReserveItem) {
        this.Suites = sub.reserve.ReserveItem.filter((r: any) => {
          return r.serviceTypeId === 6;
        });
        if (sub.reserve.ServiceLine) {
          this.SutiePriceList = sub.reserve.ServiceLine.filter((r: any) => {
            return r.serviceTypeId === 6;
          });
        }
      }
    });
  }
}
