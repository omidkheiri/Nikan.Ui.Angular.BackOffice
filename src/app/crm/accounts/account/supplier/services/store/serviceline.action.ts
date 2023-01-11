import { createAction, props } from '@ngrx/store';
import { LocationItem } from 'src/app/crm/model/location.model';

export const setLocations = createAction(
  '[serviceline page] set location',
  props<{ payload: LocationItem[] }>()
);
export const loadLocations = createAction(
  '[serviceline page] load location',
  props<{ payload: string }>()
);
export const loadServiceLines = createAction(
  '[serviceline page] load service lines',
  props<{ payload: string }>()
);
export const deleteServiceLines = createAction(
  '[serviceline page] delete service line',
  props<{ AccountId: string; ServiceLineId: string }>()
);
export const setServiceLines = createAction(
  '[serviceline page] set service lines',
  props<{ payload: any }>()
);
export const loadServiceType = createAction(
  '[serviceline page] load service type'
);
export const setServiceType = createAction(
  '[serviceline page] set service type',
  props<{ payload: any }>()
);
export const updateServiceLineStart = createAction(
  '[serviceline page] update service line start',
  props<{ accountId: string; serviceLineId: string; serviceLine: any }>()
);
export const updateServiceLinefinished = createAction(
  '[serviceline page] update service line finished',
  props<{ payload: string }>()
);

export const saveServiceLineStart = createAction(
  '[serviceline page] save service line start',
  props<{ accountId: any; Item: any }>()
);
export const saveServiceLinefinished = createAction(
  '[serviceline page] save service line finished'
);

export const loadServiceLine = createAction(
  '[serviceline page] load service line',
  props<{ accountId: string; serviceLineId: string }>()
);
export const saveServiceLineError = createAction(
  '[serviceline page] save service line error',
  props<{ errorMessage: string }>()
);
export const setServiceLine = createAction(
  '[serviceline page] set service line',
  props<{ payload: any }>()
);
export const updateServiceLineSchemafinished = createAction(
  '[servicelineschema page] update service line schema finished',
  props<{ payload: string }>()
);
export const updateServiceLineSchemaStart = createAction(
  '[servicelineschema page] update service line schema start',
  props<{ accountId: string; serviceLineId: string; schema: string }>()
);

export const saveServiceLinePricefinished = createAction(
  '[servicelineprice page] update service line price finished',
  props<{ payload: string }>()
);
export const saveServiceLinePriceStart = createAction(
  '[servicelineprice page] save service line price start',
  props<{ accountId: string; serviceLineId: string; item: any }>()
);
export const updateServiceLinePriceStart = createAction(
  '[servicelineprice page] save service line price start',
  props<{
    accountId: string;
    serviceLineId: string;
    selectedPrice: string;
    item: any;
  }>()
);
