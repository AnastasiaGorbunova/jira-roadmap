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
  })),
  on(ProjectsActions.getProject, (state) => ({
    ...state,
    loading: true
  })),
  on(ProjectsActions.getProjectSuccess, (state, { project }) => ({
    ...state,
    projects: [ project ],
    errorMessage: null
  })),
  on(ProjectsActions.getProjectsFailed, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(ProjectsActions.deleteProject, (state) => ({
    ...state,
    loading: true
  })),
  on(ProjectsActions.deleteProjectSuccess, (state, { projectId }) => ({
    // TODO: find project and reduce it
    ...state,
    // projects: state.projects.filter(project => project.id !== projectId),
    errorMessage: null
  })),
  on(ProjectsActions.deleteProjectFailed, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(ProjectsActions.createProject, (state) => ({
    ...state,
    loading: true
  })),
  on(ProjectsActions.createProjectSuccess, (state, { newProject }) => ({
    ...state,
    // projects: [ ...state.projects, newProject ],
    errorMessage: null
  })),
  on(ProjectsActions.createProjectFailed, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(ProjectsActions.updateProject, (state) => ({
    ...state,
    loading: true
  })),
  on(ProjectsActions.updateProjectSuccess, (state, { updatedProject }) => ({
    ...state,
    // projects: [ ...state.projects, updatedProject ],
    errorMessage: null
  })),
  on(ProjectsActions.updateProjectFailed, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
);

export function projectsReducer(state: State | undefined, action: Action) {
  return _projectsReducer(state, action);
}
