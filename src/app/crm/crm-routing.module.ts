import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SupplierComponent } from './accounts/account/supplier/supplier.component';
import { SupplierHomeComponent } from './accounts/account/supplier/supplier-home/supplier-home.component';
import { AccountComponent } from './accounts/account/account.component';
import { IntroComponent } from './accounts/account/intro/intro.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CrmComponent } from './crm.component';
import { CustomerComponent } from './accounts/account/customer/customer.component';
import { ReservesComponent } from './accounts/account/supplier/reserves/reserves.component';
import { ServicesComponent } from './accounts/account/supplier/services/services.component';
import { LocationsComponent } from './accounts/account/supplier/locations/locations.component';
import { AccountFormComponent } from './accounts/account/account-form/account-form.component';
import { EditLocationComponent } from './accounts/account/supplier/locations/edit-location/edit-location.component';
import { ServiceLineEditComponent } from './accounts/account/supplier/services/service-line-edit/service-line-edit.component';
import { ServiceLinePriceComponent } from './accounts/account/supplier/services/service-line-price/service-line-price.component';
import { ServiceLineSchemaComponent } from './accounts/account/supplier/services/service-line-schema/service-line-schema.component';
import { ContactComponent } from './contacts/contact/contact.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CrmComponent,

    canActivate: [AuthGuard],
    children: [
      {
        path: 'accounts',
        component: AccountsComponent,
      },
      { path: 'accountform', component: AccountFormComponent },
      {
        path: 'account/:accountId',
        component: AccountComponent,
        children: [
          { path: '', redirectTo: 'accountform', pathMatch: 'full' },
          { path: 'accountform', component: AccountFormComponent },
          { path: 'intro', component: IntroComponent },
          {
            path: 'supplier',
            component: SupplierComponent,
            children: [
              { path: 'home', component: SupplierHomeComponent },
              { path: 'reserves', component: ReservesComponent },
              { path: 'contacts', component: ContactsComponent },
              {
                path: 'services',
                component: ServicesComponent,
                children: [
                  { path: 'edit', component: ServiceLineEditComponent },
                  {
                    path: 'edit/:serviceLineId',
                    component: ServiceLineEditComponent,
                  },

                  {
                    path: 'price/:serviceLineId',
                    component: ServiceLinePriceComponent,
                  },
                  {
                    path: 'Schema/:serviceLineId',
                    component: ServiceLineSchemaComponent,
                  },
                ],
              },
              {
                path: 'locations',
                component: LocationsComponent,
                children: [
                  { path: 'edit', component: EditLocationComponent },
                  {
                    path: 'edit/:locationId',
                    component: EditLocationComponent,
                  },
                ],
              },
            ],
          },
          {
            path: 'customer',
            component: CustomerComponent,
          },
        ],
      },

      { path: 'Contacts', component: ContactsComponent },
      { path: 'Contactform', component: ContactComponent },
      {
        path: 'Contact/:accountId/:contactId',
        component: ContactDetailComponent,
        children: [
          { path: '', redirectTo: 'contactform', pathMatch: 'full' },
          { path: 'contactform', component: ContactComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmRoutingModule {}
