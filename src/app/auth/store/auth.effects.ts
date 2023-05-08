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
import jwt_decode from 'jwt-decode';
import { EMPTY, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as fromAuth from './index';
import * as AuthActions from './auth.actions';
import { User } from '../token.model';
import { AuthService } from '../auth.service';
import { SharedService } from '../../Services/shared.service';
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
  access_token: string,
  refresh_token: string,
  client_idel_timeout: number,
  scopes: string[],
  roles: string[]
) => {
  const expirationDate = new Date(new Date().getTime() + expires_in);
  const user = new User(
    email,
    userId,
    access_token,
    expirationDate,
    refresh_token,
    client_idel_timeout,
    scopes,
    roles
  );
  localStorage.setItem('userData', JSON.stringify(user));

  return AuthActions.AuthenticateSuccess({
    payload: {
      email: email,
      userId: userId,
      token: access_token,
      expirationDate: expirationDate,
      refresh_token: refresh_token,
      client_idel_timeout: client_idel_timeout,
      scops: scopes,
      roles: roles,
      redirect: true,
    },
  });
};






const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return errorMessage;
  }
  switch (errorRes.error.error_description) {
    case 'invalid_username_or_password':
      errorMessage = 'Invalid Email or Password';
      break;
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
    case 'Tenant Id value not exists':
      errorMessage = errorRes.error.error_description;
      break;
  }
  return errorMessage;
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,

    private router: Router,
    private authService: AuthService,private sharedService:SharedService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LoginStart),
      exhaustMap((action) =>
        this.authService
          .signIn(action.payload.email, action.payload.password)
          .pipe(
            tap((responseData) => {
              this.authService.setLogoutTimer(responseData.expires_in * 1000);
            }),
            tap((responseData)=>{

             
 this.sharedService.userId.next(userIdExtractor(responseData.access_token));


            }),
            map((responseData) => {
              var roles = rolesExtractor(responseData.access_token);

              var tenantId = userTenantIdExtractor(responseData.access_token);
              

             
                return handleAuthentication(
                  +responseData.expires_in * 1000,
                  userNameExtractor(responseData.access_token),
                  userIdExtractor(responseData.access_token),
                  responseData.access_token,
                  responseData.refresh_token,

                  idelTimeouteExtractor(responseData.access_token),
                  scopeExtractor(responseData.access_token),
                  rolesExtractor(responseData.access_token)
                );


            
            }),

            catchError((errorRes) => {
              console.log(errorRes.error);
              var errorMessage = handleError(errorRes);
              return of(
                AuthActions.AuthenticateFail({ payload: errorMessage })
              );
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
              this.router.navigate(['/dashboard/content']);
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
        refresh_token: string;
        client_idel_timeout: number;
        scopes: string[];
        roles: string[];
      } = JSON.parse(localStorage.getItem('userData') as string);
      if (!userData) {
        return { type: 'DUMMY' };
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,

        new Date(userData._tokenExpirationDate),
        userData.refresh_token,
        userData.client_idel_timeout,
        userData.scopes,
        userData.roles
      );

      if (loadedUser.token) {
     
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);

        return handleAuthentication(
          +expirationDuration,
          loadedUser.email,
          loadedUser.email,
          loadedUser.token,
          loadedUser.refresh_token,
          loadedUser.client_idel_timeout,
          userData.scopes,
          userData.roles
        );
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

function rolesExtractor(access_token: string): string[] {
  var decoded: any = jwt_decode(access_token);

  return decoded.role;
}

function scopeExtractor(access_token: string): string[] {
  var decoded: any = jwt_decode(access_token);

  return decoded.scope;
}
function userNameExtractor(access_token: string): string {
  var decoded: any = jwt_decode(access_token);

  return decoded.preferred_username;
}

function userIdExtractor(access_token: string): string {
  var decoded: any = jwt_decode(access_token);

  return decoded.sub;
}
function userTenantIdExtractor(access_token: string): string {
  var decoded: any = jwt_decode(access_token);

  return decoded.TenantId ? decoded.TenantId : '';
}
function idelTimeouteExtractor(access_token: string): number {
  var decoded: any = jwt_decode(access_token);

  return decoded.client_idel_timeout ? decoded.client_idel_timeout : 0;
}
