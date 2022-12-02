import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AccountService } from '../../Services/account.service';
import { ContactService } from '../../Services/contact.service';
import * as fromStore from '../../store';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit, OnDestroy {
  id: string = '';
  contact$: Subscription | any;
  contact: any;

  constructor(
    private accountService: AccountService,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromStore.CrmModuleState>
  ) {
    this.contact$ = this.store.select<any>('CRM');
    this.route.params.subscribe((params: any) => {
      console.log(params);

      this.accountService.setAccountIdObs(params.accountId);
      this.contactService.setContactIdObs(params.contactId);
    });
  }
  ngOnDestroy(): void {
    this.contact$ = null;
  }

  ngOnInit(): void {
    this.contact$.subscribe((state: any) => {
      this.contact = state.account.account;
    });
  }

  onIntro() {
    this.router.navigate(['intro'], { relativeTo: this.route });
  }
  onAccount() {
    this.router.navigate(['contactDetail'], { relativeTo: this.route });
  }
  onCustomer() {
    this.router.navigate(['intro'], { relativeTo: this.route });
  }
}
