import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, skipWhile } from 'rxjs/operators';

import { RouterStoreActions } from '@app/root-store/features/router';
import { AppState } from '@app/root-store/state';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private _store$: Store<AppState>) { }

  public canActivate() {
    return this.getIsAuthenticated()
      .pipe(
        skipWhile((isAuthenticated: boolean | null) => isAuthenticated === null),
        map((isAuthenticated) => {
          if (isAuthenticated) {
            this._store$.dispatch(RouterStoreActions.navigateProjectsBoard());
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
