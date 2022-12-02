import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromAccount from './account.reducer';
import * as fromLocation from './location/location.reducer';
import * as fromServiceLine from '../accounts/account/supplier/services/store/serviceLine.reducer';
import * as fromContact from '../contacts/store/contact.reducer';
export interface CrmModuleState {
  account: fromAccount.State;
  location: fromLocation.State;
  serviceline: fromServiceLine.State;
  contact: fromContact.State;
}

export const crmReducers: ActionReducerMap<CrmModuleState> = {
  account: fromAccount.accountReducer,
  location: fromLocation.locationReducer,
  serviceline: fromServiceLine.serviceLineReducer,
  contact: fromContact.serviceLineReducer,
};

export const selectCrmModuleState =
  createFeatureSelector<CrmModuleState>('crmModuleState');

//export const selectSearchState = createFeatureSelector<CrmModuleState>('CRM');
