import { createReducer, on } from '@ngrx/store';
import { LocationItem } from '../../../../../model/location.model';
import * as fromAction from './serviceline.action';
export interface State {
  locations: LocationItem[] | any;
  selectedLocation: string;
  serviceLines: any;
  serviceTypes: any;
  currentServiceLine: any;
}
const initialState: State = {
  locations: [],
  selectedLocation: '',
  serviceLines: [],
  serviceTypes: [],
  currentServiceLine: {},
};

export const serviceLineReducer = createReducer(
  initialState,
  on(fromAction.setLocations, (state, { payload: locations }) => ({
    ...state,
    locations: locations,
  })),
  on(fromAction.setServiceLines, (state, { payload: servicelines }) => ({
    ...state,

    serviceLines: servicelines,
  })),
  on(fromAction.setServiceType, (state, { payload: serviceTypes }) => ({
    ...state,

    serviceTypes: serviceTypes,
  })),
  on(fromAction.setServiceLine, (state, { payload: serviceLine }) => ({
    ...state,
    currentServiceLine: serviceLine,
  }))
);
