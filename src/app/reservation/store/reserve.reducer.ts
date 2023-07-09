import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ReserveItem } from '../reserve/models/ReserveItem';
import * as fromAction from './reserve.action';
import { Trip } from '../reserve/models/Trip';
export interface State {
  trip: Trip | any;

  arrivalServiceLine: any;
  departureServiceLine: any;

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
  trip: null,
  arrivalServiceLine: null,
  departureServiceLine: null,

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
  on(fromAction.SetLocation, (state, { location: location }) => ({
    ...state,
    locationId: location,
  })),
  on(fromAction.SetFlightInfo, (state, { FlightInfo: flightInfo }) => {
    var trip = state.trip;

    return {
      ...state,
      trip: { ...trip, flightInfo: flightInfo },
    };
  }),
  on(fromAction.SetArrivalLocation, (state, { oldLocationValue:oldLocationValue, FlightInfo: flightInfo }) => {
    var trip =JSON.parse(JSON.stringify(state.trip)) 
    if(!trip.reserveRecords){
    
    trip.reserveRecords=[];
    
    }
    
    var currentReserveRecord: any = [];
    if (flightInfo.arrivalLocationId) {
      currentReserveRecord = trip.reserveRecords.filter((p: any) => {
        return p.locationId !== flightInfo.oldLocationValue;
      });
      currentReserveRecord.push({locationId:flightInfo.arrivalLocationId,reserveItem:[]})
    }else{
      currentReserveRecord = trip.reserveRecords.filter((p: any) => {
        return p.locationId !== flightInfo.oldLocationValue;
      });
    }

    return {
      ...state,
      trip: {
        ...trip,
        flightInfo: flightInfo,
        reserveRecords: currentReserveRecord,
      },
    };
  }),
  on(fromAction.SetDepartureLocation, (state, {oldLocationValue:oldLocationValue, FlightInfo: flightInfo }) => {
  
 var trip =JSON.parse(JSON.stringify(state.trip)) 
if(!trip.reserveRecords){

trip.reserveRecords=[];

}


   
    var currentReserveRecord: any = [];
    if (flightInfo.departureLocationId) {
      currentReserveRecord = trip.reserveRecords.filter((p: any) => {
        return p.locationId !== flightInfo.oldLocationValue;
      });
      currentReserveRecord.push({locationId:flightInfo.departureLocationId,reserveItem:[]})
    }else{
      currentReserveRecord = trip.reserveRecords.filter((p: any) => {
        return p.locationId !== flightInfo.oldLocationValue;
      });
    }


    return {
      ...state,
      trip: {
        ...trip,
        flightInfo: flightInfo,
        reserveRecords: currentReserveRecord,
      },
    };
  }),
  on(
    fromAction.setArrivalServiceLine,
    (state, { ServiceLine: serviceLines }) => ({
      ...state,
      arrivalServiceLine: serviceLines,
    })
  ),
  on(
    fromAction.setDepartureServiceLine,
    (state, { ServiceLine: serviceLines }) => ({
      ...state,
      departureServiceLine: serviceLines,
    })
  ),
  on(
    fromAction.SaveReserveItem,
    (state, { locationId: locationId, ReserveItem: ReserveItem }) => {
      var trip = JSON.parse(JSON.stringify(state.trip));
      if (trip.reserveRecords.length > 0) {
        var currentReserveRecord: any = trip.reserveRecords.find((p: any) => {
          return p.locationId === locationId;
        });

        if (currentReserveRecord) {
          currentReserveRecord.reserveItem.push(ReserveItem);
        } else {
          var items = [];
          items.push(ReserveItem);

          trip.reserveRecords.push({
            locationId: locationId,
            reserveItem: items,
          });
        }
        return {
          ...state,
          trip: trip,
        };
      } else {
        var items = [];
        items.push(ReserveItem);

        trip.reserveRecords.push({
          locationId: locationId,
          reserveItem: items,
        });

        return {
          ...state,
          trip: trip,
        };
      }
    }
  ),
  on(
    fromAction.UpdateReserveItem,
    (state, { locationId: locationId, Id: Id, ReserveItem: ReserveItem }) => {
      var trip = JSON.parse(JSON.stringify(state.trip));
      var reserveRecord = trip.reserveRecords.find((p: any) => {
        return p.locationId === locationId;
      });

      var Items = reserveRecord.reserveItem.filter((p: any) => {
        return p.id !== Id;
      });
      Items.push(ReserveItem);
      reserveRecord.reserveItem = Items;
      return {
        ...state,
        trip: trip,
      };
    }
  ),

  // on(fromAction.UpdatePet, (state, {locationId: locationId, Id: Id, ReserveItem: ReserveItem }) => {
  //   // const Items: any = state.ReserveItem.filter((p: any) => {
  //   //   return p.serviceLineId !== Id;
  //   // });
  //   // Items.push(ReserveItem);
  //   return {
  //     ...state,
  //     ReserveItem: Items,
  //   };
  // }),

  on(
    fromAction.DeleteReserveItem,
    (state, { locationId: locationId, Id: Id }) => {
      var trip = JSON.parse(JSON.stringify(state.trip));
      var reserveRecord = trip.reserveRecords.find((p: any) => {
        return p.locationId === locationId;
      });

      var Items = reserveRecord.reserveItem.filter((p: any) => {
        return p.id !== Id;
      });

      reserveRecord.reserveItem = Items;

      return {
        ...state,
        trip: trip,
      };
    }
  ),

  on(fromAction.SetStateFromStorage, (state, { oldState: state1 }) => {
    return {
      ...state,
      trip: state1.trip,
     
      ServiceLine: state1.ServiceLine,
    
      contactId: state1.contactId,
      contactFullName: state1.contactFullName,
      contactPhone: state1.contactPhone,
      contactAccountId: state1.contactAccountId,
      clientReserveId: state1.clientReserveId,
      id: state1.id,
      reserveNumber: state1.reserveNumber,
    };
  }),

  // on(
  //   fromAction.UpdateVisaReserveItem,
  //   (state, { ReserveItem: reserveItem }) => {
  //     const Items: any = state.ReserveItem.filter((p: any) => {
  //       return (
  //         !p.visa ||
  //         p.visa.relatedPassengerId !== reserveItem.visa?.relatedPassengerId
  //       );
  //     });
  //     Items.push(reserveItem);
  //     return {
  //       ...state,
  //       ReserveItem: Items,
  //     };
  //   }
  // ),
  // on(
  //   fromAction.UpdateWheelchairReserveItem,
  //   (state, { ReserveItem: reserveItem }) => {
  //     const Items: any = state.ReserveItem.filter((p: any) => {
  //       return (
  //         !p.wheelchair ||
  //         p.wheelchair.relatedPassengerId !==
  //           reserveItem.wheelchair?.relatedPassengerId
  //       );
  //     });
  //     Items.push(reserveItem);
  //     return {
  //       ...state,
  //       ReserveItem: Items,
  //     };
  //   }
  // ),
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


      var trip = JSON.parse(JSON.stringify(state.trip));
     if(!trip){
      trip={};
     }

         trip.contactId= contactId;
         trip.contactFullName= contactFullName;
         trip.contactPhone= contactPhone;
         trip.contactAccountId= accountId;
         trip.clientReserveId= clientReserveId;


      return {
        ...state,
       trip:trip 
      };
    }
  ),
  on(fromAction.SetReserveFromApi, (state, { reserve: reserve }) => {
    return {
      ...state,
 
      contactId: reserve.contactId,
      contactFullName: reserve.contactFullName,
      contactPhone: reserve.contactPhone,
      contactAccountId: reserve.contactAccountId,
      clientReserveId: reserve.clientReserveId,
      id: reserve.id,
      trip:reserve
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
  }),
  on(fromAction.addFakeTrip, (state) => {
    return { ...state, trip: {} };
  })
);
