import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
//import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { AccountService } from '../../Services/account.service';
import { Account } from '../../model/account.model';
import { loadAccount } from '../../store/account.action';
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
    private store: Store<fromStore.CrmModuleState>,
    private AccountService: AccountService
  ) {
    this.account$ = this.store.select<any>('CRM');
    this.route.params.subscribe((params: any) => {
      this.store.dispatch(loadAccount({ payload: params.accountId }));
      AccountService.setAccountIdObs(params.accountId);
    });
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');

    this.account$ = null;
  }

  ngOnInit(): void {
    this.account$.subscribe((state: any) => {
      console.log(state);

      this.account = state.account.account;
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
