import { Action, createReducer, on } from '@ngrx/store';

import * as IssuesActions from '@app/root-store/features/issues/actions';
import { initialState, State } from '@app/root-store/features/issues/state';

const _issuesReducer = createReducer(
  initialState,
  on(IssuesActions.createIssue, (state) => ({
    ...state,
    loading: true
  })),
  on(IssuesActions.createIssueSuccess, (state) => ({
    ...state,
    errorMessage: null
  })),
  on(IssuesActions.createIssueFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(IssuesActions.getIssues, (state) => ({
    ...state,
    loading: true
  })),
  on(IssuesActions.getIssuesSuccess, (state, { projectId, issues }) => ({
      ...state,
      issues: { ...state.issues, [projectId]: issues },
      errorMessage: null
    })
  ),
  on(IssuesActions.getIssuesFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(IssuesActions.getIssue, (state) => ({
    ...state,
    loading: true
  })),
  on(IssuesActions.getIssueSuccess, (state, { projectId, issue }) => ({
    ...state,
    issues: { [projectId]: [issue] },
    errorMessage: null
  })),
  on(IssuesActions.getIssueFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(IssuesActions.getIssueSubtasks, (state) => ({
    ...state,
    loading: true
  })),
  on(IssuesActions.getIssueSubtasksSuccess, (state, { projectId, issues }) => {
    const existingIssues = (state.issues || {})[projectId] || [];
    return ({
      ...state,
      issues: { [projectId]: [ ...existingIssues, ...issues ] },
      errorMessage: null
    });
  }),
  on(IssuesActions.getIssueSubtasksFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(IssuesActions.deleteIssue, (state) => ({
    ...state,
    loading: true
  })),
  on(IssuesActions.deleteIssueSuccess, (state) => ({
    ...state,
    loading: false,
    errorMessage: null
  })),
  on(IssuesActions.deleteIssueFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(IssuesActions.updateIssue, (state) => ({
    ...state,
    loading: true
  })),
  on(IssuesActions.updateIssueSuccess, (state) => ({
    ...state,
    loading: false,
    errorMessage: null
  })),
  on(IssuesActions.updateIssueFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  }))
);

export function issuesReducer(state: State | undefined, action: Action) {
  return _issuesReducer(state, action);
}
