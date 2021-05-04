import { Action, createReducer, on } from '@ngrx/store';

import * as TasksActions from '@app/root-store/features/tasks/actions';
import { initialState, State } from '@app/root-store/features/tasks/state';

const _tasksReducer = createReducer(
  initialState,
  on(TasksActions.createIssue, (state) => ({
    ...state,
    loading: true
  })),
  on(TasksActions.createIssueSuccess, (state) => ({
    ...state,
    errorMessage: null
  })),
  on(TasksActions.createIssueFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(TasksActions.getIssues, (state) => ({
    ...state,
    loading: true
  })),
  on(TasksActions.getIssuesSuccess, (state, { projectId, issues }) => ({
      ...state,
      issues: { ...state.issues, [projectId]: issues },
      errorMessage: null
    })
  ),
  on(TasksActions.getIssuesFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(TasksActions.getIssue, (state) => ({
    ...state,
    loading: true
  })),
  on(TasksActions.getIssueSuccess, (state, { projectId, issue }) => ({
    ...state,
    issues: { [projectId]: [issue] },
    errorMessage: null
  })),
  on(TasksActions.getIssueFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(TasksActions.getIssueSubtasks, (state) => ({
    ...state,
    loading: true
  })),
  on(TasksActions.getIssueSubtasksSuccess, (state, { projectId, issues }) => {
    const existingIssues = (state.issues || {})[projectId] || [];
    return ({
      ...state,
      issues: { [projectId]: [ ...existingIssues, ...issues ] },
      errorMessage: null
    });
  }),
  on(TasksActions.getIssueSubtasksFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(TasksActions.deleteIssue, (state) => ({
    ...state,
    loading: true
  })),
  on(TasksActions.deleteIssueSuccess, (state) => ({
    ...state,
    loading: false,
    errorMessage: null
  })),
  on(TasksActions.deleteIssueFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(TasksActions.updateIssue, (state) => ({
    ...state,
    loading: true
  })),
  on(TasksActions.updateIssueSuccess, (state) => ({
    ...state,
    loading: false,
    errorMessage: null
  })),
  on(TasksActions.updateIssueFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  }))
);

export function tasksReducer(state: State | undefined, action: Action) {
  return _tasksReducer(state, action);
}
