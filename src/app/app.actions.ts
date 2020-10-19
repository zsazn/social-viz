/*
 * File Created: Sunday, 18th October 2020 1:50:27 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 3:12:10 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { createAction, props } from '@ngrx/store';
import { FormData } from '../typings';

export const addRecord = createAction(
  '[Friends Form Component] Add_record',
  props<{payload: FormData}>() // payload is one FormData object
);

export const loadData = createAction(
  '[App Component] Load_data',
  props<{payload: FormData[]}>() // payload is an array of FormData
);
