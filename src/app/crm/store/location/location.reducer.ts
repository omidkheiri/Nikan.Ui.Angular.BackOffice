import { createReducer, on } from '@ngrx/store';

import * as locationAction from './location.action';
import { LocationItem } from '../../model/location.model';

export interface State {
  locations: any;
  currentlocation: any;
  loadingLocationFrom: boolean;
}
const initialState: State = {
  locations: [] as LocationItem[],
  currentlocation: {},
  loadingLocationFrom: false,
};

export const locationReducer = createReducer(
  initialState,
  on(locationAction.setLocationList, (state, { payload: locations }) => ({
    ...state,
    locations,
  })),

  on(
    locationAction.loadCurrentLocation,
    (state, { payload: currentlocation }) => ({
      ...state,
      currentlocation,
    })
  ),
  on(
    locationAction.updateCurrentLocation,
    (state, { payload: currentlocation }) => ({
      ...state,
      currentlocation,
    })
  ),
  on(
    locationAction.saveCurrentLocation,
    (state, { payload: currentlocation }) => ({
      ...state,
      currentlocation,
    })
  )
);
