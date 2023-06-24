import { createAction, props } from '@ngrx/store';
import { FlightInfo, ReserveItem } from '../reserve/models/reserve.model';

export const LoadStateFromStorage = createAction(
  '[Reserve Page] Load State From Storage',
  props<{ locationId: string }>()
);
export const SetStateFromStorage = createAction(
  '[Reserve Page] Set State From Storage',
  props<{ oldState: any }>()
);
export const LoadLocation = createAction(
  'Location',
  props<{ locationId: string }>()
);
export const SetLocation = createAction(
  'Location',
  props<{ location: any }>()
);

export const SaveState = createAction(
  '[Reserve Component] save status',
  props<{ state: any }>()
);

export const SetFlightInfo = createAction(
  '[FlightInfo Component] set FlightInfo',
  props<{ FlightInfo: any }>()
);

export const SetServiceLine = createAction(
  '[FlightInfo Component] set ServiceLine',
  props<{ ServiceLine: any }>()
);
export const LoadServiceLineInReserve = createAction(
  '[FlightInfo Component] load ServiceLine',
  props<{ locationId: string; flightDate: any }>()
);
export const SaveReserveItem = createAction(
  '[Reserve Component] Save Reserve Item',
  props<{ ReserveItem: ReserveItem }>()
);
export const UpdateReserveItem = createAction(
  '[Reserve Component] Update Reserve Item',
  props<{ Id: string; ReserveItem: ReserveItem }>()
);
export const UpdateSuite = createAction(
  '[Reserve Component] Update Suite',
  props<{ Id: string; ReserveItem: ReserveItem }>()
);
export const UpdatePet = createAction(
  '[Reserve Component] Update Pet',
  props<{ Id: string; ReserveItem: ReserveItem }>()
);

export const DeleteReserveItem = createAction(
  '[Reserve Component] Delete Reserve Item',
  props<{ Id: string }>()
);
export const UpdateWheelchairReserveItem = createAction(
  '[Reserve Component] Update Wheelchair Reserve Item',
  props<{ ReserveItem: ReserveItem }>()
);
export const UpdateVisaReserveItem = createAction(
  '[Reserve Component] Update visa Reserve Item',
  props<{ ReserveItem: ReserveItem }>()
);
export const SetCustomerId = createAction(
  '[Reserve Component] Set Customer Id',
  props<{
    contactId: string;
    contactFullName: string;
    contactPhone: string;
    contactAccountId: string;
    clientReserveId: string;
  }>()
);
export const LoadReserveFromApi = createAction(
  '[Reserve Component] Load Reserve From Api',
  props<{ reserveId: string }>()
);
export const SetReserveFromApi = createAction(
  '[Reserve Component] Set Reserve From Api11111111',
  props<{ reserve: any }>()
);
export const ClearReserve = createAction('[Reserve Component] Clear Reserve');
export const SetReserveMode = createAction(
  '[Reserve Component] SetReserveMode',
  props<{ mode: string }>()
);
