import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducer';

export interface AuthModuleState {
  auth: fromAuth.State;
}

export const authReducers: ActionReducerMap<AuthModuleState> = {
  auth: fromAuth.authReducer,
};

export const selectAuthState = createFeatureSelector<AuthModuleState>('AUTH');
