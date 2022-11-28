import { Action, createReducer, on } from '@ngrx/store';
import { Account } from '../model/account.model';
import * as AccuntAction from './account.action';

export interface State {
  account: Account;
  saved: boolean;
}

const initialState: State = {
  account: {} as Account,
  saved: false,
};
export const accountReducer = createReducer(
  initialState,
  on(AccuntAction.saveAccountFinished, (state, { payload: account }) => ({
    state,
    account: account,
    saved: true,
  })),
  on(AccuntAction.updateAccountFinished, (state, { payload: account }) => ({
    state,
    account: account,
    saved: true,
  })),
  on(AccuntAction.accountSaved, (state, { payload: saved }) => ({
    state,
    account: state.account,
    saved: saved,
  }))
);
