/*
 * File Created: Sunday, 18th October 2020 1:50:27 am
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Sunday, 18th October 2020 1:47:11 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { createAction, props } from '@ngrx/store';
import { FormData } from '../typings';

export const addRecord = createAction(
  '[Friends Form Component] Add_record',
  props<{payload: FormData}>()
);

export const loadData = createAction(
  '[App Component] Load_data',
  props<{payload: FormData[]}>()
);
