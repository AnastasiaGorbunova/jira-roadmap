import { Action, createReducer, on } from '@ngrx/store';

import * as ProjectsActions from '../actions';
import { initialState, State } from '../state';

const _projectsReducer = createReducer(
  initialState,
  on(ProjectsActions.getProjects, (state) => ({
    ...state,
    loading: true
  })),
  on(ProjectsActions.getProjectsSuccess, (state, { projects }) => ({
    ...state,
    projects,
    errorMessage: null
  })),
  on(ProjectsActions.getProjectsFailed, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  }))
);

export function projectsReducer(state: State | undefined, action: Action) {
  return _projectsReducer(state, action);
}
