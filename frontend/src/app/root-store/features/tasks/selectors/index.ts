import { createSelector } from '@ngrx/store';
import _groupby from 'lodash.groupby';

import { Issue } from '@app/core/models/task.model';
import { AppState } from '@app/root-store/state';
import { selectedProjectId, selectedIssueId } from '@app/root-store/features/router/selectors';
import { State as TasksState } from '@app/root-store/features/tasks/state';
import { usersSelector } from '@app/root-store/features/users/selectors';
import { User } from '@app/core/models/user.model';

// TODO: get issues state
export const getTasksState = (state: AppState) => state.tasks;

export const issuesSelector = createSelector(
  getTasksState,
  (state: TasksState): { [projectId: string]: Issue[] } => state.issues || {}
);

export const projectIssuesSelector = createSelector(
  issuesSelector,
  selectedProjectId,
  (issues: { [projectId: string]: Issue[] }, projectId: string): Issue[] => {
    return issues[projectId] || [];
  }
);

// TODO: add type
export const projectIssuesMapSelector = createSelector(
  projectIssuesSelector,
  (issues: Issue[]): { [taskId: string]: any } => {
    const issuesGroupedByIssueId = _groupby(issues, 'issue_id');


    // other issues is all issues without subtasks
    const { 'undefined': otherIssues, ...subtasksMap } = issuesGroupedByIssueId;

    const issuesIds = Object.keys(subtasksMap || {});
    const subtasksGroupedByStatusMap = {}; 

    issuesIds.forEach(issueId => {
      subtasksGroupedByStatusMap[issueId] = _groupby(subtasksMap[issueId], 'status');
    });

    const otherIssuesWithoutSubtasks = [];
    const issuesWithSubtasks = [];

    // todo: check if has no subtasks
    otherIssues?.forEach(issue => {
      if (!subtasksMap[issue.id]) {
        otherIssuesWithoutSubtasks.push(issue);
      } else {
        issuesWithSubtasks.push(issue);
      }
    });
    console.log('otherIssuesWithoutSubtasks', otherIssuesWithoutSubtasks);
    
    const otherIssuesGroupedByStatus =  _groupby(otherIssuesWithoutSubtasks, 'status');
    console.log({ otherIssuesGroupedByStatus, subtasksGroupedByStatusMap, issuesWithSubtasks });

    console.log('issuesMap',  { otherIssuesGroupedByStatus, subtasksGroupedByStatusMap, issuesWithSubtasks });
    
    return { otherIssuesGroupedByStatus, subtasksGroupedByStatusMap, issuesWithSubtasks };
  }
);

export const issueSelector = createSelector(
  projectIssuesSelector,
  selectedIssueId,
  (issues: Issue[], issueId: string): Issue => issues.find((issue) => issue.id === issueId)
);


// export const tasksStatusMapSelector = createSelector(
//   currentProjectTasksSelector,
//   (tasks: Task[]): TaskStatusMap => {
//     return _groupby(tasks, 'status');
//   }
// );

// export const selectedTaskSelector = createSelector(
//   currentProjectTasksSelector,
//   selectedTaskId,
//   (tasks: Task[], taskId: string): Task => tasks.find((task) => task.id === taskId)
// );

export const issueAssigneeSelector = createSelector(
  usersSelector,
  (users: User[], props: { assigneeId: string }): string => {
    const assignedUser = users.find(user => user.id === props.assigneeId);
    const { first_name, last_name } = assignedUser;
    
    return `${first_name} ${last_name}`;
  }
);

// export const currentProjectSubTasksSelector = createSelector(
//   subtasksSelector,
//   selectedProjectId,
//   (subtasks: { [projectId: string]: SubTask[] }, projectId: string): SubTask[] => {
//     return subtasks[projectId] || [];
//   }
// );

// export const subtasksStatusMapSelector = createSelector(
//   currentProjectSubTasksSelector,
//   (subtasks: SubTask[]): SubTaskStatusMap => {
//     const subtasksGroupedByTaskId = _groupby(subtasks, 'task_id');
//     const tasksIds = Object.keys(subtasksGroupedByTaskId || {});
//     const subtasksMap = {};

//     tasksIds.forEach(taskId => {
//       const subtasksGroupedByStatus = _groupby(subtasksGroupedByTaskId[taskId], 'status');
//       subtasksMap[taskId] = subtasksGroupedByStatus;
//     });
    
//     return subtasksMap;
//   }
// );

// export const tasksIssueMapSelector = createSelector(
//   subtasksStatusMapSelector,
//   currentProjectTasksSelector,
//   (subtasksMap: SubTaskStatusMap, tasks: Task[]): { tasksWithSubtasks: Task[], otherIssues: { [status: string]: Task[] } } => {
//     const tasksWithSubtasks = [];
//     const otherIssues = [];

//     tasks.forEach(task => {
//       if (subtasksMap[task.id]) {
//         tasksWithSubtasks.push(task);
//       } else {
//         otherIssues.push(task);
//       }
//     });

//     const otherIssuesStatusMap = _groupby(otherIssues, 'status')

//     return { tasksWithSubtasks, otherIssues: otherIssuesStatusMap };
//   }
// );