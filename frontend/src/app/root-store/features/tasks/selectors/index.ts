import { createSelector } from '@ngrx/store';
import _groupby from 'lodash.groupby';

import { Task } from 'src/app/core/models/task.model';
import { AppState } from 'src/app/root-store/state';
import { selectedProjectId } from '../../router/selectors';
import { State as TasksState } from '../state';

export const getTasksState = (state: AppState) => state.tasks;

// TODO: add 'selector' postfix to all selectors
export const tasksSelector = createSelector(
  getTasksState,
  (state: TasksState): { [projectId: string]: Task[] } => state.tasks || {}
);

export const currentProjectTasksSelector = createSelector(
  tasksSelector,
  selectedProjectId,
  (tasks: { [projectId: string]: Task[] }, projectId: string) => {
    console.log(tasks[projectId]);
    
    return tasks[projectId];
  }
)

export const tasksStatusMapSelector = createSelector(
  currentProjectTasksSelector,
  (tasks: Task[]) => {
    console.log('grouped',  _groupby(tasks, 'status'));
    
    return _groupby(tasks, 'status');

  }
)