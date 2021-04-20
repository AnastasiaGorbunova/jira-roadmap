import { UntilDestroy } from '@ngneat/until-destroy';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import * as RouterActions from '../actions';

@UntilDestroy()
@Injectable()
export class RouterEffects implements OnDestroy {
  public navigateRoom$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(RouterActions.navigateProjectsBoard),
        tap(() => {
          this._router.navigateByUrl('projects');
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

  ngOnDestroy() {}

  constructor(
    private _actions$: Actions,
    private _router: Router
  ) {}
}
