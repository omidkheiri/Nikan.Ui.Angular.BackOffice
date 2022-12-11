import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscribable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Account } from 'src/app/crm/model/account.model';
import { MenuHandlerService } from './menu-handler.service';
import { AnimationConfig } from 'devextreme/animation/fx';
import { LocationListComponent } from '../location-list/location-list.component';
import { MenuDirective } from './shared/menu.directive';
import { MenuComponent } from './shared/menu.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  //@ViewChild('menuHost', { static: true }) menuHost: MenuDirective;
  @ViewChild('menuHost', { read: ViewContainerRef })
  menuHost!: ViewContainerRef;
  account$: Subscribable<Account> | any;
  account: Account | any;
  constructor(
    public viewContainerRef: ViewContainerRef,
    private menuService: MenuHandlerService,
    private authService: AuthService,
    private store: Store<{ account: Account }>
  ) {
    // this.account$ = this.store.select('account');
  }
  showProfile = '';
  showsubMenu = '';
  showSub(submenu: string) {
    this.showsubMenu = submenu;
  }
  mouseOut(event: any) {
    this.showsubMenu = '';
  }
  ngOnInit(): void {}
  ngAfterViewInit() {}
  loadComponent() {
    const viewContainerRef = this.menuHost;

    const componentRef = viewContainerRef.createComponent<MenuComponent>(
      LocationListComponent
    );
    componentRef.instance.data = 'adItem.data';
  }

  openmenu() {
    this.menuService.menuStatus.next(true);
  }
  openProfile() {
    this.showProfile = this.showProfile === '' ? 'show' : '';
  }
  logOute() {
    localStorage.removeItem('userData');
    window.location.reload();
  }
  viewLocation = false;
  onOpenLocationList() {
    this.viewLocation = true;
    this.loadComponent();
  }
  animationOptions = {
    show: {
      type: 'pop',
      duration: 300,
      from: {
        scale: 0.55,
      },
    },
    hide: {
      type: 'pop',
      duration: 300,
      to: {
        opacity: 0,
        scale: 0.55,
      },
      from: {
        opacity: 1,
        scale: 1,
      },
    },
  };
}
