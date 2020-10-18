import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { addRecord, loadData } from './app.actions';
import { FormData } from '../typings';

export const initialState: FormData[] = [];

const _formReducer: ActionReducer<FormData[], Action> = createReducer(
  initialState,
  on(addRecord, (state, action) => [...state, action.payload]),
  on(loadData, (state, action) => [...state, ...action.payload])
);

export function formReducer(state: FormData[] | undefined, action: Action): FormData[] {
  return _formReducer(state, action);
}
