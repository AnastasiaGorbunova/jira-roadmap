import { UntilDestroy } from '@ngneat/until-destroy';
import { Injectable, OnDestroy } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as AuthActions from '../actions';
import * as RouterActions from '../../router/actions';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';
import { AppState } from 'src/app/root-store/state';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterStoreActions } from '../../router';

// TODO: add types
@UntilDestroy()
@Injectable()
export class AuthEffects implements OnDestroy {
  public signUp$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap(({ authData }) => {

        return from(this._authService.singUp(authData)).pipe(
          map((user: User) => AuthActions.signUpSuccess({ user })),
          catchError((error: any) =>
            of(AuthActions.signUpFailure({ message: error.message }))
          )
        );
      })
    )
  );

  public signUpSuccess = createEffect(() =>
      this._actions$.pipe(
        ofType(AuthActions.signUpSuccess),
        tap(() => {
          this._store$.dispatch(RouterActions.navigateProjectsBoard());
        })
      ),
      // TODO: learn for what it is?
      { dispatch: false }
  );

  public signOut$ = createEffect(() =>
  this._actions$.pipe(
    ofType(AuthActions.signOut),
    switchMap(() => {
      return from(this._authService.signOut()).pipe(
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
        return this._authService.firebaseUser().pipe(
          map((fireUser) => {
            console.log('fireUser', fireUser);
              // TODO: navigate to sign in will be implemented in auth guard
              return AuthActions.setIsUserAuthenticated({ isAuthenticated: !!fireUser },
              )
          })
        );
      })
    )
  );

  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _afAuth: AngularFireAuth,
    private _store$: Store<AppState>
  ) {}

  ngOnDestroy() {}
}
