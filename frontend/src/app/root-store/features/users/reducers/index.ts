import { Action, createReducer, on } from '@ngrx/store';

import * as UsersActions from '@app/root-store/features/users/actions';
import { initialState, State } from '@app/root-store/features/users/state';

const _usersReducer = createReducer(
  initialState,
  on(UsersActions.getUsers, (state) => ({
    ...state,
    loading: true
  })),
  on(UsersActions.getUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    errorMessage: null
  })),
  on(UsersActions.getUsersFailed, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  }))
);

export function usersReducer(state: State | undefined, action: Action) {
  return _usersReducer(state, action);
}
