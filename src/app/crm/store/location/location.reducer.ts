import { createReducer, on } from '@ngrx/store';

import * as locationAction from './location.action';
import { Location } from '../../model/location.model';

export interface State {
  locations: any;
}
const initialState: State = {
  locations: [] as Location[],
};

export const locationReducer = createReducer(
  initialState,
  on(locationAction.setLocationList, (state, { payload: locations }) => ({
    ...state,
    locations,
  }))
);
