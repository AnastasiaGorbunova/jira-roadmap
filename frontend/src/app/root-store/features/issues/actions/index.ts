import { createAction, props } from '@ngrx/store';

import { Issue } from '@app/core/models/issue.model';
import { createConstants } from '@app/root-store/features/utils';

const typesNames = [
  'CREATE_ISSUE',
  'CREATE_ISSUE_SUCCESS',
  'CREATE_ISSUE_FAILED',
  'GET_ISSUES',
  'GET_ISSUES_SUCCESS',
  'GET_ISSUES_FAILED',
  'GET_ISSUE',
  'GET_ISSUE_SUCCESS',
  'GET_ISSUE_FAILED',
  'GET_ISSUE_SUBTASKS',
  'GET_ISSUE_SUBTASKS_SUCCESS',
  'GET_ISSUE_SUBTASKS_FAILED',
  'DELETE_ISSUE',
  'DELETE_ISSUE_SUCCESS',
  'DELETE_ISSUE_FAILED',
  'UPDATE_ISSUE',
  'UPDATE_ISSUE_SUCCESS',
  'UPDATE_ISSUE_FAILED',
  'UPDATE_TASK_STATUS',
  'UPDATE_TASK_STATUS_SUCCESS',
  'UPDATE_TASK_STATUS_FAILED'
] as const;

export type IssuesActionType = {
  [Key in typeof typesNames[number]]: string;
};

export const prefix: string = 'ISSUES';

export const issuesActionTypes: IssuesActionType = createConstants<IssuesActionType>(
  typesNames,
  prefix,
);

export const createIssue = createAction(
  issuesActionTypes.CREATE_ISSUE,
  props<{ issue: Issue }>()
);

export const createIssueSuccess = createAction(
  issuesActionTypes.CREATE_ISSUE_SUCCESS,
);

export const createIssueFailure = createAction(
  issuesActionTypes.CREATE_ISSUE_FAILED,
  props<{ message: string }>()
);

export const getIssues = createAction(
  issuesActionTypes.GET_ISSUES
);

export const getIssuesSuccess = createAction(
  issuesActionTypes.GET_ISSUES_SUCCESS,
  props<{ projectId: string, issues: Issue[] }>()
);

export const getIssuesFailure = createAction(
  issuesActionTypes.GET_ISSUES_FAILED,
  props<{ message: string }>()
);

export const deleteIssue = createAction(
  issuesActionTypes.DELETE_ISSUE,
  props<{ projectId: string, issueId: string }>()
);

export const deleteIssueSuccess = createAction(
  issuesActionTypes.DELETE_ISSUE_SUCCESS
);

export const deleteIssueFailure = createAction(
  issuesActionTypes.DELETE_ISSUE_FAILED,
  props<{ message: string }>()
);

export const updateIssue = createAction(
  issuesActionTypes.UPDATE_ISSUE,
  props<{ issueId: string, issue: Issue }>()
);

export const updateIssueSuccess = createAction(
  issuesActionTypes.UPDATE_ISSUE_SUCCESS
);

export const updateIssueFailure = createAction(
  issuesActionTypes.UPDATE_ISSUE_FAILED,
  props<{ message: string }>()
);

export const getIssue = createAction(
  issuesActionTypes.GET_ISSUE
);

export const getIssueSuccess = createAction(
  issuesActionTypes.GET_ISSUE_SUCCESS,
  props<{ projectId: string, issue: Issue }>()
);

export const getIssueFailure = createAction(
  issuesActionTypes.GET_ISSUE_FAILED,
  props<{ message: string }>()
);

export const getIssueSubtasks = createAction(
  issuesActionTypes.GET_ISSUE_SUBTASKS
);

export const getIssueSubtasksSuccess = createAction(
  issuesActionTypes.GET_ISSUE_SUBTASKS_SUCCESS,
  props<{ projectId: string, issues: Issue[] }>()
);

export const getIssueSubtasksFailure = createAction(
  issuesActionTypes.GET_ISSUE_SUBTASKS_FAILED,
  props<{ message: string }>()
);

