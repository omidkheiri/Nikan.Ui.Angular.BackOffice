import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { Account } from '../model/account.model';
import { AccountService } from '../Services/account.service';
import * as AccountAction from './account.action';

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error) {
    return errorMessage;
  } else {
  
if(errorRes.error.errors&& errorRes.error.errors.Mobile)
return errorRes.error.errors.Mobile[0]
if(errorRes.error.errors&& errorRes.error.errors.Email)
return errorRes.error.errors.Email[0]

   }
    
    return errorRes.error.detail
      ? errorRes.error.detail
      : errorRes.error
      ? errorRes.error
      : 'An unknown error occurred!';
  }

@Injectable()
export class AccountEffect {
  loadAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountAction.loadAccount),
      exhaustMap((action) =>
        this.accountService
          .getAccount(action.payload)
          .pipe(
            map((account: Account) =>
              AccountAction.saveAccountFinished({ payload: account })
            )
          )
      )
    )
  );

  updateAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountAction.updateAccountStarted),
      exhaustMap((action) =>
        this.accountService
          .putAccount(action.payload)
          .pipe(
            map((account: Account) =>
              AccountAction.saveAccountFinished({ payload: account })
            ), catchError((errorRes) => {
              console.log(errorRes.error);
              var errorMessage = handleError(errorRes);
              return of(
                AccountAction.UpdateAccountFail({ payload: errorMessage })
              );
            }
          )
      )
    )
  ));
  saveAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountAction.saveAccountStarted),
      exhaustMap((action) =>
        this.accountService
          .postAccount(action.payload)
          .pipe(
            map((account: Account) =>
              AccountAction.saveAccountFinished({ payload: account })
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private router: Router
  ) {}
}
