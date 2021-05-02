import { Params } from '@angular/router';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

import { State as RouterState } from '@app/root-store/features/router/state';
import { AppState } from '@app/root-store/state';
import * as fromRouter from '@ngrx/router-store';

export const selectRouterState = createFeatureSelector<AppState, fromRouter.RouterReducerState<RouterState>>('router');

// export const getRouterState = (state: AppState) => state.router;
export const getRouterState = createSelector(selectRouterState, (state) => (!!state && state.state) || {});

export const selectRouterUrl = createSelector(
  getRouterState,
  (routerState: RouterState) => !!routerState && routerState.url
);

export const selectRouterCurrentPath = createSelector(
  getRouterState,
  (routerState: RouterState) => !!routerState && routerState.currentPath
);

export const selectRouterParams = createSelector(
  getRouterState,
  (routerState: RouterState) => !!routerState && routerState.params
);

export const selectRouterQueryParams = createSelector(
  getRouterState,
  (routerState: RouterState) => !!routerState && routerState.queryParams
);

export const selectedProjectId = createSelector(
  selectRouterParams,
  (params: Params) => {
    return !!params ? params.projectId || null : undefined
  }
);

export const selectedTaskId = createSelector(
  selectRouterParams,
  (params: Params) => {
    
    return !!params ? params.taskId || null : undefined
  }
);