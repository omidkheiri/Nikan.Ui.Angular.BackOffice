import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        return authState.user;
      }),
      exhaustMap((user) => {
        if (!user || req.url.indexOf('/connect/token')>-1) {
          return next.handle(req);
        }

        if(req.headers.get('content-type')==='multipart/form-data'){



          const modifiedReq = req.clone({
            headers: new HttpHeaders({
              
              Authorization: `Bearer ${user.token}`,
            
            }),
          });
  
          return next.handle(modifiedReq);

        }else{

          const modifiedReq = req.clone({
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            
            }),
          });
  
          return next.handle(modifiedReq);

        }
       
      })
    );
  }
}