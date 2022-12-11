import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { LocationItem } from 'src/app/crm/model/location.model';
import { LocationService } from 'src/app/crm/Services/loaction.service';
import { environment } from 'src/environments/environment';

import * as fromAction from './serviceline.action';
@Injectable()
export class ServiceLineEffect {
  loadLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.loadLocations),
      exhaustMap((action) => {
        return this.http
          .get<any>(
            `${environment.serviceLocationAddress}/ServiceLocation?AccountId=${action.payload}&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`
          )

          .pipe(
            map((locations: any) =>
              fromAction.setLocations({ payload: locations })
            )
          );
      })
    );
  });

  loadServiceLines$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.loadServiceLines),
      exhaustMap((action) => {
        return this.http
          .get<any>(
            `${environment.serviceLineAddress}/ServiceLine?AccountId=${action.payload}&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`
          )
          .pipe(
            map((serviceLines: any) =>
              fromAction.setServiceLines({ payload: serviceLines })
            )
          );
      })
    );
  });
  loadServiceLine$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.loadServiceLine),
      exhaustMap((action) => {
        return this.http
          .get<any>(
            `${environment.serviceLineAddress}/Account/${action.accountId}/ServiceLine/${action.serviceLineId}`
          )
          .pipe(
            map((serviceLine: any) =>
              fromAction.setServiceLine({ payload: serviceLine })
            )
          );
      })
    );
  });

  loadServiceType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.loadServiceType),
      exhaustMap((action) => {
        return this.http
          .get<any>(`${environment.serviceLineAddress}/ServiceTypes`)
          .pipe(
            map((serviceTypes: any) =>
              fromAction.setServiceType({ payload: serviceTypes })
            )
          );
      })
    );
  });
  saveServiceLines$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.saveServiceLineStart),
      exhaustMap((action) => {
        return this.http
          .post<any>(
            `${environment.serviceLineAddress}/Account/${action.accountId}/ServiceLine`,
            action.Item,
            { headers: { 'Content-Type': 'application/json' } }
          )
          .pipe(
            map((serviceLines: any) =>
              fromAction.saveServiceLinefinished({ payload: action.accountId })
            )
          );
      })
    );
  });

  updateServiceLines$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.updateServiceLineStart),
      exhaustMap((action) => {
        return this.http
          .put<any>(
            `${environment.serviceLineAddress}/Account/${action.accountId}/ServiceLine/${action.serviceLineId}`,
            action.serviceLine,
            { headers: { 'Content-Type': 'application/json' } }
          )
          .pipe(
            map((serviceLines: any) =>
              fromAction.updateServiceLinefinished({ payload: 'ok' })
            ),
            map((serviceLines: any) =>
              fromAction.loadServiceLines({ payload: action.accountId })
            )
          );
      })
    );
  });

  updateServiceLinesSchema$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.updateServiceLineSchemaStart),
      exhaustMap((action) => {
        return this.http
          .put<any>(
            `${environment.serviceLineAddress}/account/${action.accountId}/ServiceLine/${action.serviceLineId}/UpdateSchema`,
            `"${action.schema + ''}"`,
            { headers: { 'Content-Type': 'application/json-patch+json' } }
          )
          .pipe(
            map((serviceLines: any) =>
              fromAction.updateServiceLineSchemafinished({ payload: 'ok' })
            ),
            map((serviceLines: any) =>
              fromAction.loadServiceLines({ payload: action.accountId })
            )
          );
      })
    );
  });
  saveServiceLinesPrice$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.saveServiceLinePriceStart),
      exhaustMap((action) => {
        return this.http
          .post<any>(
            `${environment.serviceLineAddress}/account/${action.accountId}/ServiceLine/${action.serviceLineId}/ServiceLinePrice`,
            action.item,
            { headers: { 'Content-Type': 'application/json' } }
          )
          .pipe(
            map((serviceLines: any) =>
              fromAction.setServiceLine({
                payload: serviceLines,
              })
            )
          );
      })
    );
  });
  updateServiceLinesPrice$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.updateServiceLinePriceStart),
      exhaustMap((action) => {
        return this.http
          .put<any>(
            `${environment.serviceLineAddress}/account/${action.accountId}/ServiceLine/${action.serviceLineId}/ServiceLinePrice/${action.selectedPrice}`,
            action.item,
            { headers: { 'Content-Type': 'application/json' } }
          )
          .pipe(
            map((serviceLines: any) =>
              fromAction.setServiceLine({
                payload: serviceLines,
              })
            )
          );
      })
    );
  });

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private locationService: LocationService
  ) {}
}
