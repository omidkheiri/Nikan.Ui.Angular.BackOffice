import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as fromAction from './contact.action';
@Injectable()
export class ContactEffect {
  loadContact$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.loadContactStart),
      exhaustMap((action) => {
        return this.http
          .get<any>(
            `${environment.accountAddress}/account/${action.accountId}/Contact/${action.contactId}`
          )
          .pipe(
            map((contact: any) =>
              fromAction.loadContactFinished({ contact: contact })
            )
          );
      })
    );
  });

  saveContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAction.saveContactStart),
      exhaustMap((action) =>
        this.http
          .post<any>(
            `${environment.accountAddress}/account/${action.accountId}/contact`,
            action.contact
          )
          .pipe(
            map((account: any) =>
              fromAction.saveContactFinished({ contact: account })
            )
          )
      )
    )
  );
  updateContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAction.updateContactItemStart),
      exhaustMap((action) =>
        this.http
          .put<any>(
            `${environment.accountAddress}/account/${action.accountId}/contact/${action.contactId}`,
            action.contact
          )
          .pipe(
            map((conatct: any) =>
              fromAction.updateContactItemfinished({ contact: conatct })
            )
          )
      )
    )
  );

  loadAccount$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.loadAccountListStart),
      exhaustMap((action) => {
        return this.http
          .get<any>(
            `${environment.baseAddress}/Account?SearchTerm=${action.searchTerm}&PageNumber=1&PageSize=500&OrderBy=title`
          )
          .pipe(
            map((accounts: any) =>
              fromAction.loadAccountListFinished({ accounts: accounts })
            )
          );
      })
    );
  });


  addContactDiscounr$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.addContactDiscountGroup),
      exhaustMap((action) => {
        console.log("action==>",action);
        
        return this.http
          .post<any>(
            `${environment.accountAddress}/Account/${action.AccountId}/Contact/${action.ContactId}/AddDiscountGroup`,action.ContactDiscountGroup
          )
          .pipe(
            map((contact: any) =>
              fromAction.loadContactStart({accountId:action.AccountId,contactId : action.ContactId })
            )
          );
      })
    );
  });
  removeContactDiscounr$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAction.removeContactDiscountGroup),
      exhaustMap((action) => {
        console.log("action==>",action);
        
        return this.http
          .delete<any>(
            `${environment.accountAddress}/Account/${action.AccountId}/Contact/${action.ContactId}/RemoveDiscountGroup/${action.locationid}`         )
          .pipe(
            map((contact: any) =>
              fromAction.loadContactStart({accountId:action.AccountId,contactId : action.ContactId })
            )
          );
      })
    );
  });

  constructor(private http: HttpClient, private actions$: Actions) {}
}
