import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

import { AuthStoreActions, AuthStoreSelectors } from '@app/root-store/features/auth';
import { UsersStoreActions } from '@app/root-store/features/users';
import { AppState } from '@app/root-store/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;

  constructor(private _store$: Store<AppState>) { }

  ngOnInit() {
    this._store$.dispatch(AuthStoreActions.checkIsUserAuthenticated());
    this.isAuthenticated$ = this._store$.pipe(
      select(AuthStoreSelectors.isAuthenticated)
    );

    this.isAuthenticated$
      .pipe(
        filter((value) => !!value),
        take(1),
        tap(() => {
          this._store$.dispatch(UsersStoreActions.getUsers());
        })
      )
      .subscribe();
  }
}
