import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  catchError,
  lastValueFrom,
  map,
  Observable,
  Subscription,
  tap,
} from 'rxjs';
import * as fromAction from '../store/contact.action';
import * as fromAccountAction from '../../store/account.action';
import * as fromStore from '../../store';

import { HttpClient, HttpParams } from '@angular/common/http';

import CustomStore from 'devextreme/data/custom_store';
import { environment } from 'src/environments/environment';
import { AccountService } from '../../Services/account.service';
import { ContactService } from '../../Services/contact.service';
import DataSource from 'devextreme/data/data_source';
import { FormGroupState } from 'ngrx-forms';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit {
  formState$: Observable<FormGroupState<any>>;
  store$: any;
  contact$: Observable<any>;
  dataSource: any;
  accountId: string = '';
  conatctId: string = '';
  editmode: boolean = false;
  contactForm: FormGroup;
  httpclient: any;
  name: Observable<string>;
  lastName = '';

  constructor(
    private accountService: AccountService,
    private contactService: ContactService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromStore.CrmModuleState>,
    private ref: ChangeDetectorRef
  ) {
    this.contactForm = new FormGroup({
      accountId: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      emailAddress: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
    });
    this.loadList(this.http);
    this.store$ = this.store.select<any>('CRM');
  }

  loadList(http: HttpClient) {
    this.dataSource = new CustomStore({
      key: 'id',
      byKey(key) {
        console.log(key);

        return http
          .get<any>(`${environment.accountAddress}/account/${key}`)
          .toPromise();
      },
      load(loadOptions: any) {
        var filter = `skip=0&take=20&requireTotalCount=true&filter=[["title","contains","${loadOptions.searchValue}"],"or",["emailAddress","contains","${loadOptions.searchValue}"],"or",["phone","contains","${loadOptions.searchValue}"]]`;

        return lastValueFrom(
          http.get(`${environment.baseAddress}/account?${filter}`)
        )
          .then((data: any) => ({
            data: data.data,
            totalCount: data.totalCount,
            summary: data.summary,
            groupCount: data.groupCount,
          }))
          .catch((error) => {
            throw 'Data Loading Error';
          });
      },
    });
  }

  getDisplayValue(e: any) {
    console.log(e);
    return e && e.title;
  }
  ngOnDestroy(): void {
    this.store$ = null;
  }

  ngOnInit(): void {
    if (
      location.pathname.toLocaleLowerCase() !== '/dashboard/crm/contactform'
    ) {
      this.accountService.getAccountIdObs().subscribe((a) => {
        this.accountId = a;
        this.store$.dispatch(fromAccountAction.loadAccount({ payload: a }));

        this.contactService.getContactIdObs().subscribe((b) => {
          this.conatctId = b;
          this.editmode = true;
        });
      });

      this.store$.dispatch(
        fromAction.loadContactStart({
          accountId: this.accountId,
          contactId: this.conatctId,
        })
      );

      this.store$.subscribe((state: any) => {
        this.contact$ = state.contact.currentContact;
        if (state.contact.currentContact) {
          var value = state.contact.currentContact;
          this.contactForm = new FormGroup({
            accountId: new FormControl(value.accountId, Validators.required),
            name: new FormControl(value.name, Validators.required),
            lastName: new FormControl(value.lastName, Validators.required),
            birthDate: new FormControl(value.birthDate, Validators.required),
            emailAddress: new FormControl(
              value.emailAddress,
              Validators.required
            ),
            phone: new FormControl(value.phone, Validators.required),
          });
        }
        this.ref.markForCheck();
      });
    }
  }
  onSubmit() {
    if (!this.contactForm.valid) {
      return;
    }

    var contact = {
      name: this.contactForm.value.name,
      lastName: this.contactForm.value.lastName,
      phone: this.contactForm.value.phone,
      emailAddress: this.contactForm.value.emailAddress,
      birthDate: this.contactForm.value.birthDate,
    };
    console.log(this.contactForm.value);
    var selectedAccountId = this.contactForm.value.accountId.accountId;
    if (
      location.pathname.toLocaleLowerCase() === '/dashboard/crm/contactform'
    ) {
      this.store$.dispatch(
        fromAction.saveContactStart({
          accountId: selectedAccountId,
          contact: contact,
        })
      );
    } else {
      this.store$.dispatch(
        fromAction.updateContactItemStart({
          accountId: this.accountId,
          contactId: this.conatctId,
          contact: contact,
        })
      );
    }
  }
}
