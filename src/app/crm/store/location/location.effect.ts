import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as locationActions from './location.action';
@Injectable()
export class LocationEffect {
  loadLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType('[Locations API] load Locations'),
      mergeMap((action) => {
        console.log('Location');

        console.log(action);
        // ${payload}
        return this.http
          .get<any>(
            `${environment.serviceLocationAddress}/ServiceLocation?AccountId=&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`
          )
          .pipe(
            map((location) => ({
              type: '[LocationList Page] get Locations',
              payload: location,
            })),
            catchError(() => EMPTY)
          );
      })
    );
  });

  constructor(private http: HttpClient, private actions$: Actions) {}
}
