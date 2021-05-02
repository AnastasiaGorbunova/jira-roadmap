import { createSelector } from '@ngrx/store';
import _groupby from 'lodash.groupby';

import { Task, TaskStatusMap } from '@app/core/models/task.model';
import { AppState } from '@app/root-store/state';
import { selectedProjectId, selectedTaskId } from '@app/root-store/features/router/selectors';
import { State as TasksState } from '@app/root-store/features/tasks/state';
import { selectUsers } from '@app/root-store/features/users/selectors';
import { User } from '@app/core/models/user.model';

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
);

export const tasksStatusMapSelector = createSelector(
  currentProjectTasksSelector,
  (tasks: Task[]): TaskStatusMap => {
    return _groupby(tasks, 'status');
  }
);

export const selectedTaskSelector = createSelector(
  currentProjectTasksSelector,
  selectedTaskId,
  (tasks: Task[], taskId: string): Task => tasks.find((task) => task.id === taskId)
);

export const taskAssigneeSelector = createSelector(
  selectUsers,
  (users: User[], props: { assigneeId: string }): string => {
    const assignedUser = users.find(user => user.id === props.assigneeId);
    const { first_name, last_name } = assignedUser;
    
    return `${first_name} ${last_name}`;
  }
);
