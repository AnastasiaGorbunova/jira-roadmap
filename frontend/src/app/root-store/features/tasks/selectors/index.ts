import { createSelector } from '@ngrx/store';
import _groupby from 'lodash.groupby';

import { Issue } from '@app/core/models/task.model';
import { AppState } from '@app/root-store/state';
import { selectedProjectId, selectedIssueId } from '@app/root-store/features/router/selectors';
import { State as TasksState } from '@app/root-store/features/tasks/state';
import { usersSelector } from '@app/root-store/features/users/selectors';
import { unassigned, User } from '@app/core/models/user.model';

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

    const otherIssuesGroupedByStatus = _groupby(otherIssuesWithoutSubtasks, 'status');

    return { otherIssuesGroupedByStatus, subtasksGroupedByStatusMap, issuesWithSubtasks };
  }
);

export const issueSelector = createSelector(
  projectIssuesSelector,
  selectedIssueId,
  (issues: Issue[], issueId: string): Issue => issues.find((issue) => issue.id === issueId)
);

export const issueSubtasksSelector = createSelector(
  projectIssuesSelector,
  selectedIssueId,
  (issues: Issue[], issueId: string): Issue[] => {
    const issueSubtasks = issues.filter(issue => issue.issue_id === issueId);

    return issueSubtasks;
  }
);

export const issueAssigneeSelector = createSelector(
  usersSelector,
  (users: User[], props: { assigneeId: string }): string => {
    const assignedUser = users.find(user => user.id === props.assigneeId);
    if (assignedUser) {
      const { first_name, last_name } = assignedUser;
      return `${first_name} ${last_name}`;
    }

    return unassigned;
  }
);

export const issueReporterSelector = createSelector(
  usersSelector,
  (users: User[], props: { reporterId: string }): string => {
    const reporter = users.find(user => user.id === props.reporterId);
    const { first_name, last_name } = reporter || {};

    return `${first_name} ${last_name}`;
  }
);
