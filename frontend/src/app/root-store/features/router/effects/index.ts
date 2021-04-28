import { UntilDestroy } from '@ngneat/until-destroy';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

import * as RouterActions from '@app/root-store/features/router/actions';
import * as RouterSelectors from '@app/root-store/features/router/selectors';
import { AppState } from '@app/root-store/state';

@UntilDestroy()
@Injectable()
export class RouterEffects implements OnDestroy {
  public navigateProjectsBoard$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(RouterActions.navigateProjectsBoard),
        tap(() => {
          this._router.navigateByUrl('projects-board');
        })
      ),
    { dispatch: false }
  );

  public navigateLogin$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(RouterActions.navigateSignIn),
        tap(() => {
          this._router.navigateByUrl('login');
        })
      ),
    { dispatch: false }
  );

  public navigateProject$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(RouterActions.navigateProject),
        tap(({ projectId }) => {
          this._router.navigateByUrl(`project/${projectId}`);
        })
      ),
    { dispatch: false }
  );

  public navigateTask$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(RouterActions.navigateTask),
        switchMap(({ taskId }) =>
        combineLatest([
          of(taskId),
          this._store$.select(RouterSelectors.selectedProjectId),
        ]).pipe(take(1))
      ),
        tap(([ taskId, projectId ]) => {
          this._router.navigateByUrl(`project/${projectId}/task/${taskId}`);
        })
      ),
    { dispatch: false }
  );

  ngOnDestroy() {}

  constructor(
    private _actions$: Actions,
    private _router: Router,
    private _store$: Store<AppState>
  ) {}
}
