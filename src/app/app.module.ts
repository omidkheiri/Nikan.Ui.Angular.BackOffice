import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './Shared/shared,module';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {
  DxNumberBoxModule,
  DxButtonModule,
  DxDateBoxModule,
  DxSelectBoxModule,
} from 'devextreme-angular';

import { AppComponent } from './app.component';
import { SingleComponent } from './layouts/single/single.component';
import { MasterComponent } from './layouts/master/master.component';
import { HeaderComponent } from './layouts/master/header/header.component';
import { ContentComponent } from './content/content.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BasicDataComponent } from './basic-data/basic-data.component';
import { ReservationComponent } from './reservation/reservation.component';

import { JalaliPipe } from './Shared/jalali.pipe';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AccountEffect } from './crm/store/account.effect';
import { AuthEffects } from './auth/store/auth.effects';
import { LocationEffect } from './crm/store/location/location.effect';
import { AuthModule } from './auth/auth.module';
import { ServiceLineEffect } from './crm/accounts/account/supplier/services/store/serviceline.effect';

export const metaReducers: MetaReducer<any>[] = [debug];
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

@NgModule({
  declarations: [
    AppComponent,
    SingleComponent,
    MasterComponent,
    HeaderComponent,
    ContentComponent,
    LoginComponent,
    ProfileComponent,
    BasicDataComponent,
    ReservationComponent,
    JalaliPipe,
  ],
  imports: [
    SharedModule,
    DxButtonModule,
    DxDateBoxModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([
      AccountEffect,
      AuthEffects,
      LocationEffect,
      ServiceLineEffect,
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [AccountEffect],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
