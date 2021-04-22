import { createSelector } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';

import { AppState } from 'src/app/root-store/state';
import { State as AuthState } from '../state';

export const getAuthState = (state: AppState) => state.auth;

export const loading = createSelector<AppState, AuthState, boolean>(
  getAuthState,
  (state: AuthState) => state.loading
);

export const getAuthErrorMessage = createSelector<AppState, AuthState, string | null>(
  getAuthState,
  (state: AuthState) => {
    console.log('errorMessage: ', state.errorMessage);

    return state.errorMessage;
  }
);

export const isAuthenticated = createSelector<AppState, AuthState, boolean>(
  getAuthState,
  (state: AuthState) => !!state.isAuthenticated);

export const currentUser = createSelector<AppState, AuthState, User>(
  getAuthState,
  (state: AuthState) => state.currentUser
);
