import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromAccount from './account.reducer';
import * as fromLocation from './location/location.reducer';

export interface CrmModuleState {
  account: fromAccount.State;
  location: fromLocation.State;
}

export const crmReducers: ActionReducerMap<CrmModuleState> = {
  account: fromAccount.accountReducer,
  location: fromLocation.locationReducer,
};

export const selectCrmModuleState =
  createFeatureSelector<CrmModuleState>('crmModuleState');

//export const selectSearchState = createFeatureSelector<CrmModuleState>('CRM');
