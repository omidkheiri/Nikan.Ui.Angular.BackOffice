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
      {
        path: 'account/:Id',
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
              { path: 'services', component: ServicesComponent },
              { path: 'locations', component: LocationsComponent },
            ],
          },
          {
            path: 'customer',
            component: CustomerComponent,
          },
        ],
      },

      { path: 'contacts', component: ContactsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmRoutingModule {}
