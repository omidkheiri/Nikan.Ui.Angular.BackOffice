import { ActionReducerMap } from '@ngrx/store';

import * as fromAccount from '../crm/store/account.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromLocation from '../crm/store/location/location.reducer';

export interface AppState {
  account: fromAccount.State;
  auth: fromAuth.State;
  location: fromLocation.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer as any,
  account: fromAccount.accountReducer as any,
  location: fromLocation.locationReducer as any,
};
