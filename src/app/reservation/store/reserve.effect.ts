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

  loadServiceLine$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.LoadServiceLineInReserve),
      exhaustMap((action) => {
        return this.http
          .get<any>(
            `${environment.serviceLineAddress}/ServiceLine/Location/${
              action.locationId
            }?DateTime=${Moment(action.flightDate).format('yyyy/MM/DD')}`
          )
          .pipe(
            map((location: any) =>
              fromAction.SetServiceLine({ ServiceLine: location })
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
            `reserve_${
              action.state.LocationId.id
                ? action.state.LocationId.id
                : action.state.LocationId
            }`,
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
          .get<any>(`${environment.ReserveAddress}/Reserve/${action.reserveId}`)
          .pipe(
            switchMap((reserve) => {
              return [
                fromAction.SetReserveFromApi({ reserve: reserve }),
                fromAction.LoadServiceLineInReserve({
                  locationId: reserve.locationId,
                  flightDate: reserve.flightInfo.flightDate,
                }),
                fromAction.LoadLocation({ locationId: reserve.locationId }),
              ];
            })
          );
      })
    );
  });

  constructor(private actions$: Actions, private http: HttpClient) {}
}
