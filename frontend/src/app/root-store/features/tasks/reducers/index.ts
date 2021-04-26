import { Action, createReducer, on } from '@ngrx/store';

import * as TasksActions from '../actions';
import { initialState, State } from '../state';

const _tasksReducer = createReducer(
  initialState,
  on(TasksActions.createTask, (state) => ({
    ...state,
    loading: true
  })),
  on(TasksActions.createTaskSuccess, (state) => ({
    ...state,
    errorMessage: null
  })),
  on(TasksActions.createTaskFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(TasksActions.getTasks, (state) => ({
    ...state,
    loading: true
  })),
  on(TasksActions.getTasksSuccess, (state, { projectId, tasks }) => ({
    ...state,
    tasks: { ...state.tasks, [projectId]: tasks },
    errorMessage: null
  })),
  on(TasksActions.createTaskFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
);

export function tasksReducer(state: State | undefined, action: Action) {
  return _tasksReducer(state, action);
}
