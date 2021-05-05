import { createAction, props } from '@ngrx/store';
import { User, UserAuthData } from 'src/app/core/models/user.model';

import { createConstants } from '@app/root-store/features/utils';

const typesNames = [
  'SIGN_UP',
  'SIGN_UP_SUCCESS',
  'SIGN_UP_FAILURE', 
  'SIGN_IN',
  'SIGN_IN_SUCCESS',
  'SIGN_IN_FAILURE',
  'SIGN_OUT',
  'CHECK_USER_AUTH',
  'SET_USER_AUTH',
  'GET_CURRENT_USER_SUCCESS',
  'GET_CURRENT_USER_FAILED',
  'CLEAR_AUTH_ERROR'
] as const;

export type AuthActionType = {
  [Key in typeof typesNames[number]]: string;
};

export const prefix: string = 'AUTH';

export const authActionTypes: AuthActionType = createConstants<AuthActionType>(
  typesNames,
  prefix,
);

export const signIn = createAction(
  authActionTypes.SIGN_IN,
  props<{ authData: UserAuthData }>()
);

export const signInSuccess = createAction(
  authActionTypes.SIGN_IN_SUCCESS,
);

export const signInFailure = createAction(
  authActionTypes.SIGN_IN_FAILURE,
  props<{ message: string }>()
);

export const signUp = createAction(
  authActionTypes.SIGN_UP,
  props<{ authData: UserAuthData }>()
);

export const signUpSuccess = createAction(
  authActionTypes.SIGN_UP_SUCCESS,
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

export const getCurrentUserSuccess = createAction(
  authActionTypes.GET_CURRENT_USER_SUCCESS,
  props<{ currentUser: User }>()
);

export const getCurrentUserFailed = createAction(
  authActionTypes.GET_CURRENT_USER_FAILED,
  props<{ message: string }>()
);

export const clearAuthError = createAction(
  authActionTypes.CLEAR_AUTH_ERROR
);
