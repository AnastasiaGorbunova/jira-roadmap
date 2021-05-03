import { Action, createReducer, on } from '@ngrx/store';

import * as TasksActions from '@app/root-store/features/tasks/actions';
import { initialState, State } from '@app/root-store/features/tasks/state';

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
  on(TasksActions.createSubTask, (state) => ({
    ...state,
    loading: true
  })),
  on(TasksActions.createSubTaskSuccess, (state) => ({
    ...state,
    errorMessage: null
  })),
  on(TasksActions.createSubTaskFailure, (state, { message }) => ({
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
    })
  ),
  on(TasksActions.getTasksFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(TasksActions.getTask, (state) => ({
    ...state,
    loading: true
  })),
  on(TasksActions.getTaskSuccess, (state, { projectId, task }) => ({
    ...state,
    tasks: { [projectId]: [task] },
    errorMessage: null
  })),
  on(TasksActions.getTaskFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(TasksActions.deleteTask, (state) => ({
    ...state,
    loading: true
  })),
  on(TasksActions.deleteTaskSuccess, (state) => ({
    ...state,
    loading: false,
    errorMessage: null
  })),
  on(TasksActions.deleteTaskFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(TasksActions.updateTask, (state) => ({
    ...state,
    loading: true
  })),
  on(TasksActions.updateTaskSuccess, (state) => ({
    ...state,
    loading: false,
    errorMessage: null
  })),
  on(TasksActions.updateTaskFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(TasksActions.getSubTasks, (state) => ({
    ...state,
    loading: true
  })),
  on(TasksActions.getSubTasksSuccess, (state, { projectId, subtasks }) => ({
      ...state,
      subtasks: { ...state.tasks, [projectId]: subtasks },
      errorMessage: null
    })
  ),
  on(TasksActions.getSubTasksFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
);

export function tasksReducer(state: State | undefined, action: Action) {
  return _tasksReducer(state, action);
}
