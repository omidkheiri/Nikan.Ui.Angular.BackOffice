import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromReserve from './reserve.reducer';
export interface ReserveModuleState {
  reserve: fromReserve.State;
}

export const reserveReducers: ActionReducerMap<ReserveModuleState> = {
  reserve: fromReserve.reserveReducer,
};

export const selectCrmModuleState =
  createFeatureSelector<ReserveModuleState>('reserveModuleState');
