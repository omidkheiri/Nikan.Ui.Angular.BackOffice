import { createReducer, on } from '@ngrx/store';
import { User } from '../token.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User | any;
  authError: any;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.AuthenticateSuccess, (state, { payload }) => {
    const user = new User(
      payload.email,
      payload.userId,
      payload.token,
      payload.expirationDate
    );

    return {
      ...state,
      authError: null,
      user: user,
      loading: false,
    };
  }),
  on(AuthActions.Logout, (state) => {
    return {
      ...state,
      user: null,
    };
  }),
  on(AuthActions.LoginStart, (state) => {
    return {
      ...state,
      authError: null,
      loading: true,
    };
  }),
  on(AuthActions.AuthenticateFail, (state, { payload }) => {
    return {
      ...state,
      user: null,
      authError: payload,
      loading: false,
    };
  }),
  on(AuthActions.ClearError, (state) => {
    return {
      ...state,
      authError: null,
    };
  })
);
