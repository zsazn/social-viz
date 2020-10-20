/*
 * File Created: Saturday, 17th October 2020 11:26:35 am
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 3:47:55 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadData } from './app.actions';
import { LoadDataService } from './shared/services/load-data.service';
import { FormData } from '../typings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private data: FormData[] = [];
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<{data: FormData[]}>,
    private loadDataService: LoadDataService
  ) {}

  ngOnInit(): void {
    // preload some mock data for visualization purpose on app init
    this.loadDataService.loadData().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.data = res as FormData[];
      this.dispatchLoadData(); // dispatch Load_data action
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  dispatchLoadData(): void {
    // dispatch Load_data action with a payload of preloaded data
    this.store.dispatch(loadData({payload: this.data}));
  }
}
