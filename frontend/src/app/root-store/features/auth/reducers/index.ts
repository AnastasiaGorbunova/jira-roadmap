import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from '../actions';
import { initialState, State } from '../state';

const _authReducer = createReducer(
  initialState,
  on(AuthActions.signUp, (state) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.signUpSuccess, (state, { user }) => ({
    ...state,
    isAuthenticated: true,
    currentUser: user,
    errorMessage: null
  })),
  on(AuthActions.signUpFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
//   on(AuthActions.logIn, (state) => ({
//     ...state,
//     loading: true,
//   })),
//   on(AuthActions.logInSuccess, (state, { token }) => ({
//     ...state,
//     isAuthenticated: true,
//     token: token,
//     errorMessage: null,
//   })),
//   on(AuthActions.logInFailure, (state, { message }) => ({
//     ...state,
//     loading: false,
//     errorMessage: message,
//   })),
  on(AuthActions.signOut, (state) => ({
    ...state,
    loading: false,
    currentUser: undefined,
    token: null,
    isAuthenticated: null,
  })),
  on(AuthActions.setIsUserAuthenticated, (state, { isAuthenticated }) => ({
    ...state,
    isAuthenticated,
  }))
);

export function authReducer(state: State | undefined, action: Action) {
  return _authReducer(state, action);
}
