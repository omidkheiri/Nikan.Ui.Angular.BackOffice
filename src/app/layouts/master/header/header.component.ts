import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscribable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Account } from 'src/app/crm/model/account.model';
import { MenuHandlerService } from './menu-handler.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  account$: Subscribable<Account> | any;
  account: Account | any;
  constructor(
    private menuService: MenuHandlerService,
    private authService: AuthService,
    private store: Store<{ account: Account }>
  ) {
    this.account$ = this.store.select('account');
  }
  showProfile = '';
  ngOnInit(): void {
    this.account$.subscribe((data: any) => {
      this.account = data.account;
    });
  }
  openmenu() {
    this.menuService.menuStatus.next(true);
  }
  openProfile() {
    this.showProfile = this.showProfile === '' ? 'show' : '';
  }
  logOute() {
    localStorage.removeItem('token');
    this.authService.isAuthenticated.next(false);
  }
}
