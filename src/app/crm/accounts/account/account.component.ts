import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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
      this.account = data.account;
      console.log(this.account);
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
