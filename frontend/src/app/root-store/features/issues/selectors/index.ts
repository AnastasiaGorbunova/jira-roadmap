import { createSelector } from '@ngrx/store';
import _groupby from 'lodash.groupby';

import { Issue, IssuesMap } from '@app/core/models/issue.model';
import { AppState } from '@app/root-store/state';
import { selectedProjectId, selectedIssueId } from '@app/root-store/features/router/selectors';
import { State as IssuesState } from '@app/root-store/features/issues/state';
import { usersSelector } from '@app/root-store/features/users/selectors';
import { unassigned, User } from '@app/core/models/user.model';

export const getIssuesState = (state: AppState) => state.issues;

export const issuesSelector = createSelector(
  getIssuesState,
  (state: IssuesState): { [projectId: string]: Issue[] } => state.issues || {}
);

export const projectIssuesSelector = createSelector(
  issuesSelector,
  selectedProjectId,
  (issues: { [projectId: string]: Issue[] }, projectId: string): Issue[] => {
    return issues[projectId] || [];
  }
);

export const issuesMapSelector = createSelector(
  projectIssuesSelector,
  (issues: Issue[]): IssuesMap => {
    const issuesGroupedByIssueId = _groupby(issues, 'issue_id');

    // other issues is all issues without subtasks
    const { 'undefined': otherIssues, ...subtasksMap } = issuesGroupedByIssueId;

    const issuesIds = Object.keys(subtasksMap || {});
    const subtasksGroupedByStatusMap = {};

    if (subtasksMap) {
      issuesIds.forEach(issueId => {
        subtasksGroupedByStatusMap[issueId] = _groupby(subtasksMap[issueId], 'status');
      });
    }

    const otherIssuesWithoutSubtasks = [];
    const issuesWithSubtasks = [];

    otherIssues?.forEach(issue => {
      if (subtasksMap && !subtasksMap[issue?.id]) {
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

export const hasIssueExist = createSelector(
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
