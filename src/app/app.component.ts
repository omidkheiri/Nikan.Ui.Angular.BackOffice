import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/auth.service';

import { LoggingService } from './login.service';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentDate: Date = new Date();
  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService
  ) {
    translate.setDefaultLang('fa');
    translate.use('fa');
  }
  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
    this.loggingService.printLog('Hello from AppComponent ngOnInit');

    // this.authService.isAuthenticated.subscribe((subscriber) => {
    //   if (subscriber) {
    //     if (location.pathname === '/auth/login') {
    //       this.router.navigate(['/dashboard/content']);
    //     } else {
    //       this.router.navigate([location.pathname]);
    //     }
    //   } else {
    //     if (localStorage.getItem('token')) {
    //       this.router.navigate(['/dashboard/content']);
    //     } else {
    //       this.router.navigate(['/auth/login']);
    //     }
    //   }
    // });
  }
}
