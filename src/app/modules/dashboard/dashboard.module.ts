/*
 * File Created: Saturday, 17th October 2020 3:36:10 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Sunday, 18th October 2020 8:34:28 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FriendsFormComponent } from './friends-form/friends-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    FriendsFormComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DashboardModule { }
