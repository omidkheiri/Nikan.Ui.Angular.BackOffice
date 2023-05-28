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
export const locationListUpdated = createAction(
  '[Locations page] location list updated'
);
export const deleteLocation = createAction(
  '[Locations API] delete location',
  props<{payload:{ locationId: string,accountId:string }}>()
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
export const addDiscountGroup = createAction(
  '[Location Discount Group Page] add Discount Group',
  props<{accountId:string; DiscountGroup:{Title: string,Description: string,ServiceLocationId: string,} }>()
);
export const updateDiscountGroup = createAction(
  '[Location Discount Group Page] update Discount Group',
  props<{ accountId:string;groupId:string; DiscountGroup:{Title: string,Description: string,ServiceLocationId: string,} }>()
);
export const removeDiscountGroup = createAction(
  '[Location Discount Group Page] remove Discount Group',
  props<{ accountId:string;groupId:string; ServiceLocationId: string}>()
);
export const addDiscountGroupServiceLine = createAction(
  '[Location Discount Group Page] add Discount Group Service Line',
  props<{accountId:string;ServiceLocationId:string; DiscountGroupId:string ;ServiceLineDiscount:{ServiceLineId: string,DiscountPercents: number}}>()
);
// export const updateDiscountGroup = createAction(
//   '[Location Discount Group Page] update Discount Group',
//   props<{ accountId:string;groupId:string; DiscountGroup:{Title: string,Description: string,ServiceLocationId: string,} }>()
// );
// export const removeDiscountGroup = createAction(
//   '[Location Discount Group Page] remove Discount Group',
//   props<{ accountId:string;groupId:string; ServiceLocationId: string}>()
// );
