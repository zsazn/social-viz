/*
 * File Created: Saturday, 17th October 2020 11:26:35 am
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 5:47:58 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { Injectable } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { LoadDataService } from './shared/services/load-data.service';
import { FormData } from '../typings';

@Injectable()
class MockLoadDataService extends LoadDataService {
  loadData(): Observable<FormData[]> {
    return of([]);
  }
}

describe('AppComponent', () => {
  let store: MockStore;
  const initialState: FormData[] = [];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideMockStore({initialState}),
        { provide: LoadDataService, useClass: MockLoadDataService }
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(app).toBeTruthy();
  });
});
