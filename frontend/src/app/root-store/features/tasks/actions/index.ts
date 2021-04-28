import { createAction, props } from '@ngrx/store';

import { Task } from '@app/core/models/task.model';
import { createConstants } from '@app/root-store/features/utils';

const typesNames = [
  'CREATE_TASK',
  'CREATE_TASK_SUCCESS',
  'CREATE_TASK_FAILED',
  'GET_TASKS',
  'GET_TASKS_SUCCESS',
  'GET_TASKS_FAILED',
  'GET_TASK',
  'GET_TASK_SUCCESS',
  'GET_TASK_FAILED'
] as const;

export type TaskActionType = {
  [Key in typeof typesNames[number]]: string;
};

export const prefix: string = 'TASKS';

export const tasksActionTypes: TaskActionType = createConstants<TaskActionType>(
  typesNames,
  prefix,
);

export const createTask = createAction(
  tasksActionTypes.CREATE_TASK,
  props<{ projectId: string, task: Task }>()
);

export const createTaskSuccess = createAction(
  tasksActionTypes.CREATE_TASK_SUCCESS,
);

export const createTaskFailure = createAction(
  tasksActionTypes.CREATE_TASK_FAILED,
  props<{ message: string }>()
);

export const getTasks = createAction(
  tasksActionTypes.GET_TASKS
);

export const getTasksSuccess = createAction(
  tasksActionTypes.GET_TASKS_SUCCESS,
  props<{ projectId: string, tasks: Task[] }>()
);

export const getTasksFailure = createAction(
  tasksActionTypes.GET_TASKS_FAILED,
  props<{ message: string }>()
);

export const getTask = createAction(
  tasksActionTypes.GET_TASK
);

export const getTaskSuccess = createAction(
  tasksActionTypes.GET_TASK_SUCCESS,
  props<{ projectId: string, task: Task }>()
);

export const getTaskFailure = createAction(
  tasksActionTypes.GET_TASK_FAILED,
  props<{ message: string }>()
);
