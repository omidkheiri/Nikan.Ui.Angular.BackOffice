import { createReducer, on } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { LocationItem } from '../../../../../model/location.model';
import * as fromAction from './serviceline.action';
export interface State {
  locations: LocationItem[] | any;
  selectedLocation: string;
  serviceLines: any;
  serviceTypes: any;
  currentServiceLine: any;
  loaderIndicator: boolean;
  errorMassage: string;
}
const initialState: State = {
  locations: [],
  selectedLocation: '',
  serviceLines: [],
  serviceTypes: [],
  currentServiceLine: {},
  loaderIndicator: false,
  errorMassage: '',
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
    errorMassage: '',
  })),
  on(fromAction.saveServiceLineError, (state, { errorMessage: message }) => ({
    ...state,
    errorMassage: message,
    loaderIndicator: false,
  })),
  on(fromAction.saveServiceLinefinished, (state) => {
    return {
      ...state,
      errorMassage: '',
      loaderIndicator: false,
    };
  })
);
