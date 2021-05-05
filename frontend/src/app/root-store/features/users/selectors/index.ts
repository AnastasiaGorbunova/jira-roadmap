import { createSelector } from '@ngrx/store';

import { AppState } from '@app/root-store/state';
import { State as UsersState } from '@app/root-store/features/users/state';
import { User } from '@app/core/models/user.model';
import { selectedProjectId } from '@app/root-store/features/router/selectors';

export const usersState = (state: AppState) => state.users;

export const usersSelector = createSelector(
   usersState,
  (state: UsersState): User[] => (state || {}).users || []
);

export const projectUsersSelector = createSelector(
  usersSelector,
  selectedProjectId,
 (users: User[], projectId: string): User[] => users.filter(user => user.projects[projectId])
);
