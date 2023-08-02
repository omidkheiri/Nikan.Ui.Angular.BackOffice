import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {catchError, map, of} from "rxjs"
import * as fromAction from './backOfficeUser.action'
import { HttpClient } from "@angular/common/http";
import { exhaustMap } from "rxjs";
import { environment } from "src/environments/environment";
import { ErrorParserService } from "src/app/services/error-parser.service";




@Injectable({ providedIn: 'root' })
export class BackOfficeUserEffect {
  addUserFormStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.addBackOfficeUserStart),
      exhaustMap((action) => {
        return this.http
          .post(`${environment.ApiAddress}/backofficeuser`, action.backOfficeUser)
          .pipe(
            map((data: any) => {
           
              
              return fromAction.addBackOfficeUserSucceed({
                backOfficeUser: data ,
              });
            }),

            catchError((errorRes) => {
              var errorService = new ErrorParserService();
              var errorMessage = errorService.errorHandler(errorRes);
              return of(fromAction.addBackOfficeUserFailed({ error: errorMessage }));
            })
          );
      })
    );
  });
  setUserPasswordStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.setPasswordBackOfficeUserStart),
      exhaustMap((action) => {
        return this.http
          .put(`${environment.ApiAddress}/backofficeuser/${action.userId}/changepassword`, action.PasswordModel)
          .pipe(
            map((data: any) => {
              return fromAction.setPasswordBackOfficeUserSuccess();
            }),

            catchError((errorRes) => {
              var errorService = new ErrorParserService();
              var errorMessage = errorService.errorHandler(errorRes);
              return of(fromAction.addBackOfficeUserFailed({ error: errorMessage }));
            })
          );
      })
    );
  });
  editUserFormStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.editBackOfficeUserStart),
      exhaustMap((action) => {
        return this.http
          .put(`${environment.ApiAddress}/backofficeuser/${action.itemId}`, action.backOfficeUser)
          .pipe(
            map((data: any) => {
              return fromAction.addBackOfficeUserSucceed({
                backOfficeUser: data ,
              });
            }),

            catchError((errorRes) => {
              var errorService = new ErrorParserService();
              var errorMessage = errorService.errorHandler(errorRes);
              return of(fromAction.addBackOfficeUserFailed({ error: errorMessage }));
            })
          );
      })
    );
  });
  editUserFormload$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.loadBackOfficeUserStart),
      exhaustMap((action) => {
        return this.http
          .get(`${environment.ApiAddress}/backofficeuser/${action.userId}`)
          .pipe(
            map((data: any) => {
              return fromAction.editBackOfficeUserLoaded({
                backOfficeUser: data 
              });
            }),

            catchError((errorRes) => {
              var errorService = new ErrorParserService();
              var errorMessage = errorService.errorHandler(errorRes);
              return of(fromAction.addBackOfficeUserFailed({ error: errorMessage }));
            })
          );
      })
    );
  });

  constructor(private http: HttpClient, private actions$: Actions) {}

}