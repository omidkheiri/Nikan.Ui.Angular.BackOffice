import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import * as AuthActions from './store/auth.actions';
import * as fromAuth from './store';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpirationTimer: any;

  public isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(
    private http: HttpClient,
    private store: Store<fromAuth.AuthModuleState>
  ) {
    if (localStorage.getItem('token')) {
      this.isAuthenticated.next(true);
    }
  }

  signIn(userName: string, password: string): Observable<any> {
    let body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', userName)
      .set('password', password)
      .set('scope', '   ')
      .set('client_id', environment.client_id)
      .set('client_secret', environment.client_secret);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(environment.stsUrl, body.toString(), {
      headers,
    });
  }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
     // this.store.dispatch(AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
  refreshToken(refresh_token: string): Observable<any> {
    let body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refresh_token)
      .set('scope', '   ')
      .set('client_id', environment.client_id)
      .set('client_secret', environment.client_secret);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(environment.stsUrl, body.toString(), {
      headers,
    });
  }
}
