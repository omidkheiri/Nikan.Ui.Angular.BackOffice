import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocationItem } from '../../model/location.model';
import { LocationService } from '../../Services/loaction.service';
import * as LocationActions from './location.action';
import { Moment } from 'jalali-moment';
@Injectable()
export class LocationEffect {




  addDiscountGroupServiceLine$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(LocationActions.addDiscountGroupServiceLine),
      mergeMap((action)=>{
       
        
        return this.http
        .post<any>(
          `${environment.serviceLocationAddress}/ServiceLine/${action.ServicelocationId}/DiscountGroup/${action.DiscountGroupId}`
          ,action.ServiceLineDiscount
          ,
          { headers: { 'Content-Type': 'application/json' } }
        )
        .pipe(
         
          map((location) => {
            return LocationActions.loadLocations({
              payload: action.accountId
            });
          }),
         
          catchError((error) => {
            return EMPTY;
          })
        );
    }))})


  deleteLocationDiscount$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LocationActions.removeDiscountGroup),
      exhaustMap((action) => {
      
       return this.http.delete<any>(
          `${environment.serviceLocationAddress}/ServiceLocation/${action.ServicelocationId}/DiscountGroup/${action.groupId}`     ,
          { headers: { 'Content-Type': 'application/json' } }
        )
        .pipe(
         
          map(() => {
            return LocationActions.loadLocations({
              payload: action.accountId
            });
          }),
         
          catchError((error) => {
            return EMPTY;
          })
        );
      })
    );
  });
  addDiscountGroup$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(LocationActions.addDiscountGroup),
      mergeMap((action)=>{
        return this.http
        .post<any>(
          `${environment.serviceLocationAddress}/DiscountGroup`,action.DiscountGroup
          ,
          { headers: { 'Content-Type': 'application/json' } }
        )
        .pipe(
         
          map((location) => {
            return LocationActions.loadLocations({
              payload: action.accountId
            });
          }),
         
          catchError((error) => {
            return EMPTY;
          })
        );
    }))})
    updateDiscountGroup$=createEffect(()=>{
      return this.actions$.pipe(
        ofType(LocationActions.updateDiscountGroup),
        mergeMap((action)=>{
          return this.http
          .put<any>(
            `${environment.serviceLocationAddress}/ServiceLocation/DiscountGroup/${action.groupId}`,action.DiscountGroup
            ,
            { headers: { 'Content-Type': 'application/json' } }
          )
          .pipe(
           
            map((location) => {
              return LocationActions.loadLocations({
                payload: action.accountId
              });
            }),
           
            catchError((error) => {
              return EMPTY;
            })
          );
      }))})

  
    
  loadLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LocationActions.loadLocations),
      mergeMap((action) => {
        LocationActions.setLocationList({ payload: action.payload });

        if (!action.payload) {
          () => EMPTY;
        }
        // ${payload}
        return this.http
          .get<any>(
            `${environment.serviceLocationAddress}/ServiceLocation?accountId=${action.payload}&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`
          )
          .pipe(
            map((location) => ({
              type: '[LocationList Page] get Locations',
              payload: location,
            })),
            catchError((error) => {
              console.log(error);
              return EMPTY;
            })
          );
      })
    );
  });
  updateLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LocationActions.updateCurrentLocation),
      mergeMap((action) => {
        return this.http
          .put<any>(
            `${environment.serviceLocationAddress}/ServiceLocation/${action.payload.id}`,
            action.payload
          )
          .pipe(
            map((location) =>
              LocationActions.loadCurrentLocation({
                payload: location,
              })
            ),
            map((location) => {
              return LocationActions.loadLocations({
                payload: 'location',
              });
            }),
            map((location: any) => LocationActions.locationListUpdated()),
            catchError(() => EMPTY)
          );
      })
    );
  });
  saveLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LocationActions.saveCurrentLocation),
      mergeMap((action) => {
        return this.http
          .post<any>(
            `${environment.serviceLocationAddress}/ServiceLocation`,
            {
              title: action.payload.title,
              address: action.payload.address,
              location: action.payload.location,
              arrivalBufferTime: action.payload.arrivalBufferTime,
              departureBufferTime: action.payload.departureBufferTime,
              transferBufferTime: action.payload.transferBufferTime,
              maxAcceptDate: action.payload.maxAcceptDate,
              account: {
                id: action.payload.account.id,
                title: '',
              },
            },
            { headers: { 'Content-Type': 'application/json' } }
          )
          .pipe(
            map((location) =>
              LocationActions.loadCurrentLocation({
                payload: location,
              })
            ),
            map((location) => {
              return LocationActions.loadLocations({
                payload: location.payload.account.id,
              });
            }),
            map((location: any) => LocationActions.locationListUpdated()),

            catchError((error) => {
              return EMPTY;
            })
          );
      })
    );
  });

  loadcurrentLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LocationActions.loadingCurrentLocation),
      exhaustMap((action) => {
        return this.locationService
          .getLocation(action.payload)
          .pipe(
            map((location: LocationItem) =>
              LocationActions.loadCurrentLocation({ payload: location })
            )
          );
      })
    );
  });

  deleteLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LocationActions.deleteLocation),
      exhaustMap((action) => {
        return this.locationService
          .deleteLocation(action.payload)
          .pipe(map((location: any) => LocationActions.locationListUpdated()));
      })
    );
  });

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private locationService: LocationService
  ) {}
}
