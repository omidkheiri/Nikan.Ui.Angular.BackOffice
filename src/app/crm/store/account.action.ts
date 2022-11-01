import { createAction, props } from '@ngrx/store';
import { Account } from '../model/account.model';

export const setAccount = createAction(
  '[Account Page] set account',
  props<{ payload: Account }>()
);
export const updateAccountStarted = createAction(
  '[Account Page] update account started',
  props<{ payload: Account }>()
);
export const updateAccountFinished = createAction(
  '[Account Page] update account',
  props<{ payload: Account }>()
);
export const loadAccount = createAction(
  '[Account API] load account',
  props<{ payload: string }>()
);
