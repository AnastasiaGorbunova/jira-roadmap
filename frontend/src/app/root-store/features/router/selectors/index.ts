import { Params } from '@angular/router';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { State as RouterState } from '../state';
import { AppState } from 'src/app/root-store/state';

export const selectRouterState = createFeatureSelector<AppState, fromRouter.RouterReducerState<RouterState>>('router');

export const getRouterState = (state: AppState) => state.router;


export const selectRouterUrl = createSelector<AppState, RouterState, string>(
  getRouterState,
  (routerState: RouterState) => !!routerState && routerState.url
);

export const selectRouterCurrentPath = createSelector<AppState, RouterState, string>(
  getRouterState,
  (routerState: RouterState) => !!routerState && routerState.currentPath
);

export const selectRouterParams = createSelector<AppState, RouterState, Params>(
  getRouterState,
  (routerState: RouterState) => !!routerState && routerState.params
);

export const selectRouterQueryParams = createSelector<AppState, RouterState, Params>(
  getRouterState,
  (routerState: RouterState) => !!routerState && routerState.queryParams
);
