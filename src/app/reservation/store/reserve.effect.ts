import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as fromAction from './reserve.action';
import * as Moment from 'moment';
import { availableFonts } from '@devexpress/analytics-core/analytics-widgets-internal';
@Injectable({ providedIn: 'root' })
export class reserveEffect {
  loadLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.LoadLocation),
      exhaustMap((action) => {
        return this.http
          .get<any>(
            `${environment.serviceLocationAddress}/ServiceLocation/${action.locationId}`
          )
          .pipe(
            map((location: any) =>
              fromAction.SetLocation({ location: location })
            )
          );
      })
    );
  });

  loadArrivalServiceLine$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.LoadArrivalServiceLineInReserve),
      exhaustMap((action) => {
        return this.http
          .get<any>(
            `${environment.serviceLineAddress}/ServiceLine/Location/${
              action.locationId
            }?DateTime=${Moment(action.flightDate).format('yyyy/MM/DD')}`
          )
          .pipe(
            map((location: any) =>
              fromAction.setArrivalServiceLine({ ServiceLine: location })
            )
          );
      })
    );
  });
  loadDepartureServiceLine$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.LoadDepartureServiceLineInReserve),
      exhaustMap((action) => {
        return this.http
          .get<any>(
            `${environment.serviceLineAddress}/ServiceLine/Location/${
              action.locationId
            }?DateTime=${Moment(action.flightDate).format('yyyy/MM/DD')}`
          )
          .pipe(
            map((location: any) =>
              fromAction.setDepartureServiceLine({ ServiceLine: location })
            )
          );
      })
    );
  });

  saveState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAction.SaveState),
        tap((action: any) => {
          localStorage.setItem(
            `reserve`,
            JSON.stringify(action.state)
          );
        })
      ),
    { dispatch: false }
  );

  loadReserveFromApi1$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.LoadReserveFromApi),
      exhaustMap((action) => {
        return this.http
          .get<any>(`${environment.ReserveAddress}/Trip/${action.reserveId}`)
          .pipe(
            switchMap((reserve) => {
              return [
                fromAction.SetReserveFromApi({ reserve: reserve }),

                // fromAction.LoadServiceLineInReserve({
                //   locationId: reserve.locationId,
                //   flightDate: reserve.flightInfo.flightDate,
                // }),
                // fromAction.LoadLocation({ locationId: reserve.locationId }),
              ];
            })
          );
      })
    );
  });




  SaveBackendReserveItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.SaveBackendReserveItem),
      tap((action) => {
fromAction.SaveReserveItem({locationId:action.locationId,ReserveItem:action.ReserveItem});

      }),
      exhaustMap((action) => {
        return this.http
          .put<any>(`${environment.ReserveAddress}/trip/${action.tripId}/reserverecord/${action.reserveRecordId}/add`,
          action.ReserveItem
          )
          .pipe(
            switchMap((reserve) => {
              return [
                fromAction.SetReserveFromApi({ reserve: reserve }),

                // fromAction.LoadServiceLineInReserve({
                //   locationId: reserve.locationId,
                //   flightDate: reserve.flightInfo.flightDate,
                // }),
                // fromAction.LoadLocation({ locationId: reserve.locationId }),
              ];
            })
          );
      })
    );
  });


  Sav$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.SaveBackendPassengerReserveItem),
      tap((action) => {
fromAction.UpdateReserveItem({Id:action.Id, locationId:action.locationId,ReserveItem:action.ReserveItem});

      })
      ,
      exhaustMap((action) => {
        return this.http
          .put<any>(`${environment.ReserveAddress}/trip/${action.tripId}/reserverecord/${action.reserveRecordId}/add`,
          action.ReserveItem
          )
          .pipe(
            switchMap((reserve) => {
              return [
                fromAction.SetReserveFromApi({ reserve: reserve }),

                // fromAction.LoadServiceLineInReserve({
                //   locationId: reserve.locationId,
                //   flightDate: reserve.flightInfo.flightDate,
                // }),
                // fromAction.LoadLocation({ locationId: reserve.locationId }),
              ];
            })
          );
      })
    );
  });




  UpdateBackendReserveItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.UpdateBackendReserveItem),
      tap((action) => {
            fromAction.UpdateReserveItem({Id:action.Id, locationId:action.locationId,ReserveItem:action.ReserveItem});

      }),
      exhaustMap((action) => {
        return this.http
          .put<any>(`${environment.ReserveAddress}/trip/${action.tripId}/reserverecord/${action.reserveRecordId}/reserveitem/${action.Id}/edit`,
          action.ReserveItem
          )
          .pipe(
            switchMap((reserve) => {
              return [
                fromAction.SetReserveFromApi({ reserve: reserve }),

                // fromAction.LoadServiceLineInReserve({
                //   locationId: reserve.locationId,
                //   flightDate: reserve.flightInfo.flightDate,
                // }),
                // fromAction.LoadLocation({ locationId: reserve.locationId }),
              ];
            })
          );
      })
    );
  });







  DeleteReserveItemFromBackend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.DeleteReserveItemFromBackend),
      tap((action) => {
            fromAction.DeleteReserveItem({Id:action.Id, locationId:action.locationId});

      }),
      exhaustMap((action) => {
        return this.http
          .delete<any>(`${environment.ReserveAddress}/trip/${action.tripId}/reserverecord/${action.reserveRecordId}/reserveitem/${action.Id}/delete`,
       
          )
          .pipe(
            switchMap((reserve) => {
              return [
                fromAction.SetReserveFromApi({ reserve: reserve }),

                // fromAction.LoadServiceLineInReserve({
                //   locationId: reserve.locationId,
                //   flightDate: reserve.flightInfo.flightDate,
                // }),
                // fromAction.LoadLocation({ locationId: reserve.locationId }),
              ];
            })
          );
      })
    );
  });











  
  constructor(private actions$: Actions, private http: HttpClient) {}
}
