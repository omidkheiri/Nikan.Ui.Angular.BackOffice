import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngJsoneditorModule } from '@maaxgr/ang-jsoneditor';
import {
  DxButtonModule,
  DxDateBoxModule,
  DxPopupModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
} from 'devextreme-angular';

import { AccountsComponent } from './accounts/accounts.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CrmRoutingModule } from './crm-routing.module';
import { CrmComponent } from './crm.component';
import { AccountComponent } from './accounts/account/account.component';
import { IntroComponent } from './accounts/account/intro/intro.component';
import { SupplierHomeComponent } from './accounts/account/supplier/supplier-home/supplier-home.component';
import { ReservesComponent } from './accounts/account/supplier/reserves/reserves.component';
import { SupplierComponent } from './accounts/account/supplier/supplier.component';
import { CustomerComponent } from './accounts/account/customer/customer.component';
import { ServicesComponent } from './accounts/account/supplier/services/services.component';
import { LocationsComponent } from './accounts/account/supplier/locations/locations.component';
import { AccountFormComponent } from './accounts/account/account-form/account-form.component';
import { crmReducers } from './store';
import { EditLocationComponent } from './accounts/account/supplier/locations/edit-location/edit-location.component';
import { ServiceLineEditComponent } from './accounts/account/supplier/services/service-line-edit/service-line-edit.component';
import { ServiceLinePriceComponent } from './accounts/account/supplier/services/service-line-price/service-line-price.component';
import { ServiceLineSchemaComponent } from './accounts/account/supplier/services/service-line-schema/service-line-schema.component';

@NgModule({
  declarations: [
    CrmComponent,
    AccountsComponent,
    ContactsComponent,
    AccountComponent,
    IntroComponent,
    SupplierComponent,
    SupplierHomeComponent,
    ReservesComponent,
    CustomerComponent,
    ServicesComponent,
    LocationsComponent,
    AccountFormComponent,
    EditLocationComponent,
    ServiceLineEditComponent,
    ServiceLinePriceComponent,
    ServiceLineSchemaComponent,
  ],
  imports: [
    RouterModule,
    CrmRoutingModule,
    DxButtonModule,
    DxPopupModule,
    DxDateBoxModule,
    ReactiveFormsModule,
    DxTemplateModule,
    CommonModule,
    FormsModule,
    DxSelectBoxModule,
    AngJsoneditorModule,
    StoreModule.forFeature('CRM', crmReducers),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
  ],
  exports: [
    CrmComponent,
    AccountsComponent,
    ContactsComponent,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class CrmModule {}
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
