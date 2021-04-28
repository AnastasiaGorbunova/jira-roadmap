import { createSelector } from '@ngrx/store';
import _groupby from 'lodash.groupby';

import { Task, TaskStatusMap } from '@app/core/models/task.model';
import { AppState } from '@app/root-store/state';
import { selectedProjectId, selectedTaskId } from '@app/root-store/features/router/selectors';
import { State as TasksState } from '@app/root-store/features/tasks/state';

export const getTasksState = (state: AppState) => state.tasks;

// TODO: add 'selector' postfix to all selectors
export const tasksSelector = createSelector(
  getTasksState,
  (state: TasksState): { [projectId: string]: Task[] } => state.tasks || {}
);

export const currentProjectTasksSelector = createSelector(
  tasksSelector,
  selectedProjectId,
  (tasks: { [projectId: string]: Task[] }, projectId: string): Task[] => {
    return tasks[projectId] || [];
  }
)

export const tasksStatusMapSelector = createSelector(
  currentProjectTasksSelector,
  (tasks: Task[]): TaskStatusMap => {
    return _groupby(tasks, 'status');
  }
)

export const selectedTaskSelector = createSelector(
  currentProjectTasksSelector,
  selectedTaskId,
  (tasks: Task[], taskId: string): Task => tasks.find((task) => task.id === taskId)
)
