import { createAction, props } from '@ngrx/store';

import { createConstants } from '@app/root-store/features/utils';

const typesNames = [
    'NAVIGATE_PROJECTS_BOARD',
    'NAVIGATE_LOGIN',
    'NAVIGATE_PROJECT',
    'NAVIGATE_ISSUE'
] as const;

export type RouterActionTypes = {
  [Key in typeof typesNames[number]]: string;
};

export const prefix: string = 'ROUTER';

export const routerActionTypes: RouterActionTypes = createConstants<RouterActionTypes>(
  typesNames,
  prefix,
);

export const navigateProjectsBoard = createAction(
  routerActionTypes.NAVIGATE_PROJECTS_BOARD
);

export const navigateSignIn = createAction(
    routerActionTypes.NAVIGATE_LOGIN
);

export const navigateProject = createAction(
  routerActionTypes.NAVIGATE_PROJECT,
  props<{ projectId: string }>()
);

export const navigateIssue = createAction(
  routerActionTypes.NAVIGATE_ISSUE,
  props<{ issueId: string }>()
);
