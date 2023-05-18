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
  saved: boolean = false;
  submitted: boolean;
  isLoading: boolean;
error="";

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
    if(this.submitted){
      this.isLoading=false;
     
     
    }
      if (this.submitted&&state.account.saved) {
       
        if (
          location.pathname.toLocaleLowerCase().indexOf('accountform') >-1
        ) {
          this.submitted=false;
          this.router.navigate(['/dashboard/crm/accounts']);
          this.account = null;
        }
      }
      else{
        this.isLoading=false;
        this.error="";
if(state.account.error)
this.error=state.account.error;

      }
    });

    // this.account$.subscribe((data: any) => {
    //   this.account = data.account as Account;
    // });
  }

  onSubmit(form: NgForm) {
    this.submitted=true;
    console.log(form);
    
    if (!form.valid) {
      return;
    }
    
    this.isLoading=true;
    if (
      location.pathname.toLocaleLowerCase() === '/dashboard/crm/accountform'
    ) {
      this.store.dispatch(saveAccountStarted({ payload: form.value }));
    } else {
      this.store.dispatch(updateAccountStarted({id:this.account.id, payload: form.value }));
    }
    this.saved = true;
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
