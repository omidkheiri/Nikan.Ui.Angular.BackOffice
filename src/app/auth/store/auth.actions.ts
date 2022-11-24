import { createAction, props } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';

export const AuthenticateSuccess = createAction(
  AUTHENTICATE_SUCCESS,
  props<{
    payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    };
  }>()
);

export const Logout = createAction(LOGOUT);

export const LoginStart = createAction(
  LOGIN_START,
  props<{ payload: { email: string; password: string } }>()
);

export const AuthenticateFail = createAction(
  AUTHENTICATE_FAIL,
  props<{ payload: string }>()
);

export const SignupStart = createAction(
  SIGNUP_START,
  props<{ payload: { email: string; password: string } }>()
);

export const ClearError = createAction(
  CLEAR_ERROR,
  props<{ payload: { email: string; password: string } }>()
);
export const AutoLogin = createAction(AUTO_LOGIN);
