import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromStore from '../../../store';
import { Account } from 'src/app/crm/model/account.model';
import {
  loadAccount,
  saveAccountStarted,
  updateAccountStarted,
} from 'src/app/crm/store/account.action';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css'],
})
export class AccountFormComponent implements OnInit, OnDestroy {
  id: string = '';
  account$: Subscription | any;
  account: Account | any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromStore.CrmModuleState>
  ) {
    this.account$ = this.store.select<any>('CRM');
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');

    this.account$ = null;
    this.account = null;
  }

  ngOnInit(): void {
    this.account$.subscribe((state: any) => {
      this.account = state.account.account;

      if (state.account.saved) {
        if (
          location.pathname.toLocaleLowerCase() === '/dashboard/crm/accountform'
        ) {
          this.router.navigate(['/dashboard/crm/accounts']);
          this.account = null;
        }
      }
    });

    // this.account$.subscribe((data: any) => {
    //   this.account = data.account as Account;
    // });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    if (
      location.pathname.toLocaleLowerCase() === '/dashboard/crm/accountform'
    ) {
      this.store.dispatch(saveAccountStarted({ payload: form.value }));
    } else {
      this.store.dispatch(updateAccountStarted({ payload: form.value }));
    }
  }
  onIntro() {
    this.router.navigate(['intro'], { relativeTo: this.route });
  }
  onAccount() {
    this.router.navigate(['accountDetail'], { relativeTo: this.route });
  }
  onCustomer() {
    this.router.navigate(['intro', {}], { relativeTo: this.route });
  }
}
