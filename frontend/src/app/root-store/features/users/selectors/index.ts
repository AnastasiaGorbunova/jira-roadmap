import { createSelector } from '@ngrx/store';

import { AppState } from '@app/root-store/state';
import { State as UsersState } from '@app/root-store/features/users/state';
import { User } from '@app/core/models/user.model';

export const usersState = (state: AppState) => state.users;

export const selectUsers = createSelector(
   usersState,
  (state: UsersState): User[] => (state || {}).users || []
);
