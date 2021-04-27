import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, skipWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AppState } from '@app/root-store/state';
import { RouterStoreActions } from '@app/root-store/features/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {

  constructor(
    private _store$: Store<AppState>, 
    ) {}

  public canLoad() {
    return this.getIsAuthenticated().pipe(
      skipWhile((isAuthenticated: boolean | null) => isAuthenticated === null),
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          this._store$.dispatch(RouterStoreActions.navigateSignIn());
          return false;
        }
        return true;
      })
    );
  }

  public getIsAuthenticated(): Observable<boolean | null> {
    return this._store$.select((state) => state.auth.isAuthenticated);
  }
}
  