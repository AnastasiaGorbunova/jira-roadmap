import { Injectable, OnDestroy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { of, from } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { AppState } from '@app/root-store/state';
import * as AuthActions from '@app/root-store/features/auth/actions';
import * as RouterActions from '@app/root-store/features/router/actions';
import { AuthService } from '@app/core/services/auth.service';
import { UsersService } from '@app/core/services/users.service';

@UntilDestroy()
@Injectable()
export class AuthEffects implements OnDestroy {
  public signUp$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap(({ authData }) => {

        return from(this._authService.singUp(authData)).pipe(
          map(() => AuthActions.signUpSuccess()),
          catchError((error: Error) =>
            of(AuthActions.signUpFailure({ message: error.message }))
          )
        );
      })
    )
  );

  public authSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.signUpSuccess, AuthActions.signInSuccess),
      tap(() => {
        this._store$.dispatch(RouterActions.navigateProjectsBoard());
      })
    ),
    { dispatch: false }
  );

  public signIn$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.signIn),
      switchMap(({ authData }) => {

        return from(this._authService.signIn(authData)).pipe(
          untilDestroyed(this),
          map(() => AuthActions.signInSuccess()),
          catchError((error: Error) =>
            of(AuthActions.signInFailure({ message: error.message }))
          )
        );
      })
    )
  );

  public signOut$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.signOut),
      switchMap(() => {

        return from(this._authService.signOut()).pipe(
          untilDestroyed(this),
          mergeMap(() => {
            return of(
              AuthActions.setIsUserAuthenticated({ isAuthenticated: false }),
              RouterActions.navigateSignIn()
            );
          })
        );
      })
    )
  );

  public checkAuth$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.checkIsUserAuthenticated),
      switchMap(() => {

        return this._usersService.getFirebaseUser().pipe(
          untilDestroyed(this),
          map((fireUser) => AuthActions.setIsUserAuthenticated({ isAuthenticated: !!fireUser }))
        );
      })
    )
  );

  public getCurrentUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.signInSuccess, AuthActions.signUpSuccess, AuthActions.setIsUserAuthenticated),
      filter((action: any) => !!action['isAuthenticated']),
      switchMap(() => {

        return this._usersService.getCurrentUser().pipe(
          untilDestroyed(this),
          map((currentUser) => AuthActions.getCurrentUserSuccess({ currentUser })),
          catchError((error: Error) =>
            of(AuthActions.getCurrentUserFailed({ message: error.message }))
          )
        );
      })
    )
  );

  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _usersService: UsersService,
    private _store$: Store<AppState>
  ) { }

  ngOnDestroy() { }
}
