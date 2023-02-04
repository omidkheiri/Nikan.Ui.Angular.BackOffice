import { createAction, props } from '@ngrx/store';
import { Account } from '../model/account.model';

export const saveAccountFinished = createAction(
  '[Account Page] set account',
  props<{ payload: Account }>()
);
export const accountSaved = createAction(
  '[Account Page] save account completed',
  props<{ payload: boolean }>()
);
export const accountUpdated = createAction(
  '[Account Page] update account completed',
  props<{ payload: boolean }>()
);
export const updateAccountStarted = createAction(
  '[Account Page] update account started',
  props<{ payload: Account }>()
);
export const saveAccountStarted = createAction(
  '[Account Page] save account started',
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

