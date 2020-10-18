/*
 * File Created: Saturday, 17th October 2020 11:26:35 am
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Sunday, 18th October 2020 12:42:37 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';

import { formReducer } from './app.reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DashboardModule,
    SharedModule,
    StoreModule.forRoot({form: formReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
