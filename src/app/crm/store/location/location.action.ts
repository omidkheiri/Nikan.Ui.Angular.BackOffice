import { createAction, props } from '@ngrx/store';
import { LocationItem } from '../../model/location.model';

export const setLocationList = createAction(
  '[LocationList Page] get Locations',
  props<{ payload: any }>()
);

export const loadLocations = createAction(
  '[Locations API] load Locations',
  props<{ payload: string }>()
);

export const loadCurrentLocation = createAction(
  '[Edit Location Page] set Location',
  props<{ payload: LocationItem }>()
);
export const setAccountId = createAction(
  '[Edit Location Page] set accountId',
  props<{ payload: string }>()
);
export const loadingCurrentLocation = createAction(
  '[Edit Location Page] loading Location',
  props<{ payload: string }>()
);
export const updateCurrentLocation = createAction(
  '[Edit Location Page] update Location',
  props<{ payload: any }>()
);
export const saveCurrentLocation = createAction(
  '[Edit Location Page] save Location',
  props<{ payload: any }>()
);
