import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as fromAction from './reserve.action';
import * as Moment from 'moment';
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

  constructor(private actions$: Actions, private http: HttpClient) {}
}
