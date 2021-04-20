import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';

import { createConstants } from 'src/app/root-store/features/utils';

const typesNames = [
  'SIGN_UP',
  'SIGN_UP_SUCCESS',
  'SIGN_UP_FAILURE', 
  'LOGIN',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE',
  'SIGN_OUT',
  'CHECK_USER_AUTH',
  'SET_USER_AUTH'
] as const;

export type AuthActionType = {
  [Key in typeof typesNames[number]]: string;
};

export const prefix: string = 'AUTH';

export const authActionTypes: AuthActionType = createConstants<AuthActionType>(
  typesNames,
  prefix,
);

// export const logIn = createAction(
//   authActionTypes.LOGIN,
//   props<{ email: string, password: string }>()
// );

// export const logInSuccess = createAction(
//   authActionTypes.LOGIN_SUCCESS,
//   props<{ token: string }>()
// );

// export const logInFailure = createAction(
//   authActionTypes.LOGIN_FAILURE,
//   props<{ message: string }>()
// );

// TODO: add types
export const signUp = createAction(
  authActionTypes.SIGN_UP,
  props<{ authData: User }>()
);

export const signUpSuccess = createAction(
  authActionTypes.SIGN_UP_SUCCESS,
  props<{ user: any }>()
);

export const signUpFailure = createAction(
  authActionTypes.SIGN_UP_FAILURE,
  props<{ message: string }>()
);

export const signOut = createAction(
  authActionTypes.SIGN_OUT
);

export const checkIsUserAuthenticated = createAction(
  authActionTypes.CHECK_USER_AUTH
);

export const setIsUserAuthenticated = createAction(
  authActionTypes.SET_USER_AUTH,
  props<{ isAuthenticated: boolean }>()
);
