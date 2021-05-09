import { createSelector } from '@ngrx/store';

import { User, UserAccess, UserProjectRole } from '@app/core/models/user.model';
import { AppState } from '@app/root-store/state';
import { State as AuthState } from '@app/root-store/features/auth/state';
import { selectedProjectId } from '@app/root-store/features/router/selectors';

export const getAuthState = (state: AppState) => state.auth;

export const loading = createSelector<AppState, AuthState, boolean>(
  getAuthState,
  (state: AuthState) => state.loading
);

export const getAuthErrorMessage = createSelector<AppState, AuthState, string | null>(
  getAuthState,
  (state: AuthState) => {
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

export const currentUserIdSelector = createSelector(
  currentUser,
  (currentUser: User) => (currentUser || {}).id || ''
);

export const isCurrentUserAdminSelector = createSelector(
  currentUser,
  (currentUser: User): boolean => (currentUser || {}).role === UserAccess.Admin
);

export const isCurrentUserLeaderSelector = createSelector(
  currentUser,
  selectedProjectId,
  (currentUser: User, projectId: string): boolean =>
    ((currentUser || {}).projects || {})[projectId] === UserProjectRole.Leader
);
