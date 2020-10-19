/*
 * File Created: Saturday, 17th October 2020 11:26:35 am
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Sunday, 18th October 2020 4:26:39 pm
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
    this.loadDataService.loadData().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.data = res as FormData[];
      this.dispatchLoadData();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  dispatchLoadData(): void {
    this.store.dispatch(loadData({payload: this.data}));
  }
}
