import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import * as fromStore from '../../../store';
import 'devextreme/data/odata/store';
import { DiscountGroupComponentService } from '../../service/DiscountGroupServer';
import ArrayStore from 'devextreme/data/array_store';
import { Store } from '@ngrx/store';
import DataSource from 'devextreme/data/data_source';
import * as fromAction from '../../store/contact.action';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/crm/Services/account.service';
import { ContactService } from 'src/app/crm/Services/contact.service';
import * as fromAccountAction from '../../../store/account.action';
@Component({
  selector: 'app-contact-discount-group',
  templateUrl: './contact-discount-group.component.html',
  styleUrls: ['./contact-discount-group.component.css'],
})
export class contactDiscountGroupComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid: DxDataGridComponent;
  conatctId: any;
  getGroup = [];
  _httpClient: any;
  account: any;

  discountGroups: DataSource<any, any>;

  data: ArrayStore<any, any>;
  locationList: any;
  countactDiscountGroups: DataSource<any, any>;
  submitted: boolean;
  store$: any;
  storeData: any;
  accountId: string;
  contactId: string;
  constructor(
    private accountService: AccountService,
    private contactService: ContactService,
    private http: HttpClient,
    private discount: DiscountGroupComponentService,
    private ref: ChangeDetectorRef,
    private store: Store<fromStore.CrmModuleState>
  ) {



    this.store$ = this.store.select<any>('CRM');
    this.accountService.getaccountIdObs().subscribe((a) => {
     
      this.accountId = a;
      this.store$.dispatch(fromAccountAction.loadAccount({ payload: a }));

      this.contactService.getcontactIdObs().subscribe((b) => {
      
        
        this.conatctId = b;
       
      });
    });

    this.store$.dispatch(
      fromAction.loadContactStart({
        accountId: this.accountId,
        contactId: this.conatctId,
      })
    );
    discount.getLocationList().subscribe((data) => {
      this.locationList = data;
      this.data = new ArrayStore({
        data: data,
        key: 'id',
      });
    });
    this.ref.markForCheck();
  }
  locationSelected(e: any) {
    try {
      this.discountGroups = this.locationList.find((data: any) => {
        return data.id === e.value;
      }).discountGroups;
    } catch {}
  }
  ngOnInit(): void {
 
    this.store$.subscribe((data: any) => {
      this.storeData = data;

      this.countactDiscountGroups = new DataSource({
        store: new ArrayStore({
          key: 'locationId',
          data: data.contact.currentContact
            ? data.contact.currentContact.discountGroups
            : [],
        }),
      });
    });
  }

  SubmitFrom(e: NgForm) {
    this.submitted = true;
    if (!e.valid) {
      return;
    }
    
    
    this.store$.dispatch(
      fromAction.addContactDiscountGroup({
        contactId: this.conatctId,
        accountId: this.accountId,
        companyId: this.conatctId,
        contactDiscountGroup: e.form.value,
      })
    );
  }
  getGroupName(data1: any) {
    return this.locationList.find((data: any) => {
      return data.id === data1.data.locationId;
    })['title']
  }
  getGroupTitle(data1: any) {
    return this.locationList
      .find((data: any) => {
        return data.id === data1.data.locationId;
      })
      .discountGroups.find((d: any) => {
        return d.id === data1.data.groupId;
      })['title'];
  }
  groupRemoved(e:any){


console.log(e);

this.store$.dispatch(
  fromAction.removeContactDiscountGroup({
    contactId: this.conatctId,
    accountId: this.accountId,
    companyId: this.conatctId,
    locationId: e.data.locationId,
  })
);
  }
}
