import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from '@app/root-store/features/auth/actions';
import { initialState, State } from '@app/root-store/features/auth/state';

const _authReducer = createReducer(
  initialState,
  on(AuthActions.signUp, (state) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.signUpSuccess, (state) => ({
    ...state,
    isAuthenticated: true,
    errorMessage: null
  })),
  on(AuthActions.signUpFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(AuthActions.signIn, (state) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.signInSuccess, (state) => ({
    ...state,
    isAuthenticated: true,
    errorMessage: null
  })),
  on(AuthActions.signInFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(AuthActions.signOut, (state) => ({
    ...state,
    loading: false,
    currentUser: undefined,
    isAuthenticated: null
  })),
  on(AuthActions.setIsUserAuthenticated, (state, { isAuthenticated }) => ({
    ...state,
    isAuthenticated
  })),
  on(AuthActions.getCurrentUserSuccess, (state, { currentUser }) => ({
    ...state,
    currentUser
  })),
  on(AuthActions.getCurrentUserFailed, (state, { message }) => ({
    ...state,
    currentUser: undefined,
    errorMessage: message
  })),
  on(AuthActions.clearAuthError, (state) => ({
    ...state,
    errorMessage: undefined
  }))
);

export function authReducer(state: State | undefined, action: Action) {
  return _authReducer(state, action);
}
