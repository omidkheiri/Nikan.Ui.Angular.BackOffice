import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect, createEffect } from '@ngrx/effects';
import {
  switchMap,
  catchError,
  map,
  tap,
  mergeMap,
  exhaustMap,
} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as fromAuth from './index';
import * as AuthActions from './auth.actions';
import { User } from '../token.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  access_token: string;
  expires_in: number;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expires_in: number,
  email: string,
  userId: string,
  access_token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expires_in);
  const user = new User(email, userId, access_token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));

  return AuthActions.AuthenticateSuccess({
    payload: {
      email: email,
      userId: userId,
      token: access_token,
      expirationDate: expirationDate,
      redirect: true,
    },
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of({ type: '[Auth] Login Fail', payoad: errorMessage });
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of({ type: '[Auth] Login Fail', payoad: errorMessage });
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,

    private router: Router,
    private authService: AuthService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LoginStart),
      exhaustMap((action) =>
        this.authService
          .signIn(action.payload.email, action.payload.password)
          .pipe(
            tap((resData) => {
              this.authService.setLogoutTimer(resData.expires_in);
            }),
            map((resData) =>
              handleAuthentication(
                +resData.expires_in,
                action.payload.email,
                resData.localId,
                resData.access_token
              )
            ),

            catchError((errorRes) => {
              return handleError(errorRes);
            })
          )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AuthenticateSuccess),
        tap((authSuccessAction: any) => {
          if (authSuccessAction.payload.redirect) {
            if (
              window.location.pathname.toLowerCase() !==
              '/single/auth/login'.toLowerCase()
            ) {
              this.router.navigate([window.location.pathname]);
            } else {
              this.router.navigate(['/']);
            }
          }
        })
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AutoLogin),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData') as string);
        if (!userData) {
          return { type: 'DUMMY' };
        }

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
          // this.user.next(loadedUser);
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);

          return handleAuthentication(
            +expirationDuration,
            loadedUser.email,
            loadedUser.email,
            loadedUser.token
          );
          // return AuthActions.AuthenticateSuccess({
          //   payload: {
          //     email: loadedUser.email,
          //     userId: loadedUser.id,
          //     token: loadedUser.token,
          //     expirationDate: new Date(userData._tokenExpirationDate),
          //     redirect: true,
          //   },
          // });
        }
        return { type: 'DUMMY' };
      })
    )
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.Logout),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/single/auth/login']);
    })
  );
}
