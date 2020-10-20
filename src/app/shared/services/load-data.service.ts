/*
 * File Created: Sunday, 18th October 2020 12:26:45 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Sunday, 18th October 2020 1:46:53 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FormData } from '../../../typings';

interface ExtData {
  data: FormData[];
}

@Injectable({
  providedIn: 'root'
})
export class LoadDataService {

  constructor(
    private httpClient: HttpClient
  ) { }

  loadData(): Observable<FormData[] | unknown> {
    return this.httpClient.get('assets/data/social-viz.json').pipe(
      catchError(error => error),
      map(res => (res as ExtData).data || [])
    );
  }
}
