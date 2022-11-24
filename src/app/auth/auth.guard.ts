import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
//import { AuthService } from './auth.service';
import * as fromAuth from './store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<fromAuth.AuthModuleState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.store.select(fromAuth.selectAuthState).pipe(
      map((data) => {
        return data;
      }),
      take(1),
      map((authState) => {
        if (authState.auth.user) {
          return authState.auth.user;
        } else {
          return null;
        }
      }),
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/single/auth/login']);
      })
      // tap(isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(['/auth']);
      //   }
      // })
    );
  }
}

//     canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | boolean
//     | UrlTree
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree> {

//       this.store.select('auth').pipe(
//         take(1),
//         map(authState => {
//           return authState.user;
//         }),
//         map(user => {
//           const isAuth = !!user;
//           if (isAuth) {
//             return true;
//           }
//           return this.router.createUrlTree(['/auth']);
//         })

//     // return this.authService.isAuthenticated.pipe(
//     //   map((user) => {
//

//     //     return !!user;
//     //   })
//     // );
//   }
// }
