import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { Account } from 'src/app/crm/model/account.model';
import {
  loadAccount,
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
    private store: Store<{ account: Account }>
  ) {
    this.account$ = this.store.select('account');
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');

    this.account$ = null;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.store.dispatch(loadAccount({ payload: params.Id }));
    });

    this.account$.subscribe((data: any) => {
      this.account = data.account as Account;
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.store.dispatch(updateAccountStarted({ payload: form.value }));
  }
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
