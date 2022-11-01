import { Action, createReducer, on } from '@ngrx/store';
import { Account } from '../model/account.model';
import * as AccuntAction from './account.action';

export interface State {
  account: Account;
}

const initialState: State = {
  account: {} as Account,
};
export const accountReducer = createReducer(
  initialState,
  on(AccuntAction.setAccount, (state, { payload: account }) => ({
    state,
    account: account,
  })),
  on(AccuntAction.updateAccountFinished, (state, { payload: account }) => ({
    state,
    account: account,
  }))
);
