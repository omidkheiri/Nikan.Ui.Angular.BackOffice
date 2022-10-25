import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(userName: string, password: string) {
    let body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', userName)
      .set('password', password)
      .set('scope', ' ')
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
