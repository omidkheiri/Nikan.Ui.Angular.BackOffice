import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/auth.service';

import { LoggingService } from './login.service';
import * as fromAuth from './auth/store';
import * as authAction from './auth/store/auth.actions';
import { environment } from './../environments/environment';
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
    private store: Store<fromAuth.AuthModuleState>,
    private loggingService: LoggingService
  ) {
    translate.setDefaultLang('fa');
    translate.use('fa');
  }
  ngOnInit(): void {
    this.store.dispatch(authAction.AutoLogin());
    //this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}
