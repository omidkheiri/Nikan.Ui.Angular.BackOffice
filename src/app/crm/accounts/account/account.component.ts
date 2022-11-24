import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
//import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';

import { Account } from '../../model/account.model';
import { loadAccount, setAccount } from '../../store/account.action';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit, OnDestroy {
  id: string = '';
  account$: Subscription | any;
  account: Account | any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromStore.CrmModuleState>
  ) {
    this.account$ = this.store.select<any>('store');
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');

    this.account$ = null;
  }

  ngOnInit(): void {
    this.store.select<any>('CRM').subscribe((state) => {
      this.account = state.account.account;
    });

    this.route.params.subscribe((params: any) => {
      this.store.dispatch(loadAccount({ payload: params.Id }));
    });
  }

  onSubmit(from: NgForm) {}
  onIntro() {
    this.router.navigate(['intro'], { relativeTo: this.route });
  }
  onAccount() {
    this.router.navigate(['accountDetail'], { relativeTo: this.route });
  }
  onCustomer() {
    this.router.navigate(['intro'], { relativeTo: this.route });
  }
}
