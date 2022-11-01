import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap } from 'rxjs/operators';
import { Account } from '../model/account.model';
import { AccountService } from '../Services/account.service';
import * as AccountAction from './account.action';
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
              AccountAction.setAccount({ payload: account })
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
              AccountAction.setAccount({ payload: account })
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private accountService: AccountService
  ) {}
}
