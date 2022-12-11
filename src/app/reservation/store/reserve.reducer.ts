import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ReserveItem } from '../reserve/models/reserve.model';
import * as fromAction from './reserve.action';
export interface State {
  LocationId: any;
  FlightInfo: any;
  ServiceLine: any;
  ReserveItem: ReserveItem[];
  contactId: string;
  contactFullName: string;
  contactPhone: string;
  contactAccountId: string;
  reserveStatus: number;
  clientReserveId: string;
  id: string;
  formMode: string;
  reserveNumber: string;
}

const initialState: State = {
  LocationId: null,
  FlightInfo: null,
  ServiceLine: null,
  ReserveItem: [],
  contactId: '',
  contactFullName: '',
  contactPhone: '',
  contactAccountId: '',
  reserveStatus: 1,
  clientReserveId: '',
  id: '',
  formMode: 'new',
  reserveNumber: '',
};
export const reserveReducer = createReducer(
  initialState,
  on(fromAction.SetLocation, (state, { location: loaction }) => ({
    ...state,
    LocationId: loaction,
  })),
  on(fromAction.SetFlightInfo, (state, { FlightInfo: flightInfo }) => {
    return {
      ...state,
      FlightInfo: flightInfo,
    };
  }),
  on(fromAction.SetServiceLine, (state, { ServiceLine: serviceLines }) => ({
    ...state,
    ServiceLine: serviceLines,
  })),
  on(fromAction.SaveReserveItem, (state, { ReserveItem: ReserveItem }) => ({
    ...state,
    ReserveItem: [...state.ReserveItem, ReserveItem],
  })),
  on(
    fromAction.UpdateReserveItem,
    (state, { Id: Id, ReserveItem: ReserveItem }) => {
      const Items: any = state.ReserveItem.filter((p: any) => {
        return p.id !== Id;
      });
      Items.push(ReserveItem);
      return {
        ...state,
        ReserveItem: Items,
      };
    }
  ),
  on(fromAction.UpdateSuite, (state, { Id: Id, ReserveItem: ReserveItem }) => {
    const Items: any = state.ReserveItem.filter((p: any) => {
      return p.serviceLineId !== Id;
    });
    Items.push(ReserveItem);
    return {
      ...state,
      ReserveItem: Items,
    };
  }),
  on(fromAction.UpdatePet, (state, { Id: Id, ReserveItem: ReserveItem }) => {
    const Items: any = state.ReserveItem.filter((p: any) => {
      return p.serviceLineId !== Id;
    });
    Items.push(ReserveItem);
    return {
      ...state,
      ReserveItem: Items,
    };
  }),

  on(fromAction.DeleteReserveItem, (state, { Id: Id }) => {
    const Items = state.ReserveItem.filter((p: any) => {
      return p.id !== Id;
    });

    return {
      ...state,
      ReserveItem: Items,
    };
  }),

  on(fromAction.SetStateFromStorage, (state, { oldState: state1 }) => {
    return {
      ...state,
      LocationId: state1.LocationId,
      FlightInfo: state1.FlightInfo,
      ServiceLine: state1.ServiceLine,
      ReserveItem: state1.ReserveItem,
      contactId: state1.contactId,
      contactFullName: state1.contactFullName,
      contactPhone: state1.contactPhone,
      contactAccountId: state1.contactAccountId,
      clientReserveId: state1.clientReserveId,
      id: state1.id,
      reserveNumber: state1.reserveNumber,
    };
  }),

  on(
    fromAction.UpdateVisaReserveItem,
    (state, { ReserveItem: reserveItem }) => {
      const Items: any = state.ReserveItem.filter((p: any) => {
        return (
          !p.visa ||
          p.visa.relatedPassengerID !== reserveItem.visa?.relatedPassengerID
        );
      });
      Items.push(reserveItem);
      return {
        ...state,
        ReserveItem: Items,
      };
    }
  ),
  on(
    fromAction.UpdateWhellchairReserveItem,
    (state, { ReserveItem: reserveItem }) => {
      const Items: any = state.ReserveItem.filter((p: any) => {
        return (
          !p.wheelchair ||
          p.wheelchair.relatedPassengerID !==
            reserveItem.wheelchair?.relatedPassengerID
        );
      });
      Items.push(reserveItem);
      return {
        ...state,
        ReserveItem: Items,
      };
    }
  ),
  on(
    fromAction.SetCustomerId,
    (
      state,
      {
        contactId: contactId,
        contactFullName: contactFullName,
        contactPhone: contactPhone,
        contactAccountId: accountId,
        clientReserveId: clientReserveId,
      }
    ) => {
      return {
        ...state,
        contactId: contactId,
        contactFullName: contactFullName,
        contactPhone: contactPhone,
        contactAccountId: accountId,
        clientReserveId: clientReserveId,
      };
    }
  ),
  on(fromAction.SetReserveFromApi, (state, { reserve: reserve }) => {
    return {
      ...state,
      LocationId: reserve.locationId,
      FlightInfo: reserve.flightInfo,

      ReserveItem: reserve.reserveItems,
      contactId: reserve.contactId,
      contactFullName: reserve.contactFullName,
      contactPhone: reserve.contactPhone,
      contactAccountId: reserve.contactAccountId,
      clientReserveId: reserve.clientReserveId,
      id: reserve.id,
      reserveNumber: reserve.reserveNumber,
    };
  }),
  on(fromAction.ClearReserve, () => {
    return initialState;
  }),

  on(fromAction.SetReserveMode, (state, { mode: mode }) => {
    return {
      ...state,
      formMode: mode,
    };
  })
);
