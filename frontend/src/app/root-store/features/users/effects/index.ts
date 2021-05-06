import { Injectable, OnDestroy } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
} from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import * as UsersActions from '@app/root-store/features/users/actions';
import { AppState } from '@app/root-store/state';
import { UsersService } from '@app/core/services/users.service';

@UntilDestroy()
@Injectable()
export class UsersEffects implements OnDestroy {
  public getUsers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UsersActions.getUsers),
      mergeMap(() => {
        return this._usersService.getUsers().pipe(
          untilDestroyed(this),
          map((users) => UsersActions.getUsersSuccess({ users })),
          catchError((error) =>
            of(UsersActions.getUsersFailed({ message: error.messages }))
          )
        );
      })
    )
  );

  constructor(
    private _actions$: Actions,
    private _usersService: UsersService
  ) { }

  ngOnDestroy() { }
}
