import { createAction, props } from '@ngrx/store';

import { Issue } from '@app/core/models/task.model';
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

export type TaskActionType = {
  [Key in typeof typesNames[number]]: string;
};

export const prefix: string = 'TASKS';

export const tasksActionTypes: TaskActionType = createConstants<TaskActionType>(
  typesNames,
  prefix,
);

export const createIssue = createAction(
  tasksActionTypes.CREATE_ISSUE,
  props<{ issue: Issue }>()
);

export const createIssueSuccess = createAction(
  tasksActionTypes.CREATE_ISSUE_SUCCESS,
);

export const createIssueFailure = createAction(
  tasksActionTypes.CREATE_ISSUE_FAILED,
  props<{ message: string }>()
);

export const getIssues = createAction(
  tasksActionTypes.GET_ISSUES
);

export const getIssuesSuccess = createAction(
  tasksActionTypes.GET_ISSUES_SUCCESS,
  props<{ projectId: string, issues: Issue[] }>()
);

export const getIssuesFailure = createAction(
  tasksActionTypes.GET_ISSUES_FAILED,
  props<{ message: string }>()
);

export const deleteIssue = createAction(
  tasksActionTypes.DELETE_ISSUE,
  props<{ projectId: string, issueId: string }>()
);

export const deleteIssueSuccess = createAction(
  tasksActionTypes.DELETE_ISSUE_SUCCESS
);

export const deleteIssueFailure = createAction(
  tasksActionTypes.DELETE_ISSUE_FAILED,
  props<{ message: string }>()
);

export const updateIssue = createAction(
  tasksActionTypes.UPDATE_ISSUE,
  props<{ issue: Issue }>()
);

export const updateIssueSuccess = createAction(
  tasksActionTypes.UPDATE_ISSUE_SUCCESS
);

export const updateIssueFailure = createAction(
  tasksActionTypes.UPDATE_ISSUE_FAILED,
  props<{ message: string }>()
);

export const getIssue = createAction(
  tasksActionTypes.GET_ISSUE
);

export const getIssueSuccess = createAction(
  tasksActionTypes.GET_ISSUE_SUCCESS,
  props<{ projectId: string, issue: Issue }>()
);

export const getIssueFailure = createAction(
  tasksActionTypes.GET_ISSUE_FAILED,
  props<{ message: string }>()
);

// export const getTasks = createAction(
//   tasksActionTypes.GET_TASKS
// );

// export const getTasksSuccess = createAction(
//   tasksActionTypes.GET_TASKS_SUCCESS,
//   props<{ projectId: string, tasks: Task[] }>()
// );

// export const getTasksFailure = createAction(
//   tasksActionTypes.GET_TASKS_FAILED,
//   props<{ message: string }>()
// );

// export const getSubTasks = createAction(
//   tasksActionTypes.GET_SUBTASKS
// );

// export const getSubTasksSuccess = createAction(
//   tasksActionTypes.GET_SUBTASKS_SUCCESS,
//   props<{ projectId: string, subtasks: SubTask[] }>()
// );

// export const getSubTasksFailure = createAction(
//   tasksActionTypes.GET_SUBTASKS_FAILED,
//   props<{ message: string }>()
// );

// export const deleteTask = createAction(
//   tasksActionTypes.DELETE_TASK,
//   props<{ projectId: string, taskId: string }>()
// );

// export const deleteTaskSuccess = createAction(
//   tasksActionTypes.DELETE_TASK_SUCCESS
// );

// export const deleteTaskFailure = createAction(
//   tasksActionTypes.DELETE_TASK_FAILED,
//   props<{ message: string }>()
// );
