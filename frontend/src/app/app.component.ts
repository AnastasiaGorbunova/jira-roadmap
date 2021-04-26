import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthStoreActions, AuthStoreSelectors } from './root-store/features/auth';
import { AppState } from './root-store/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;
  
  constructor(private _store$: Store<AppState>) {}

  ngOnInit() {
    this._store$.dispatch(AuthStoreActions.checkIsUserAuthenticated());
    this.isAuthenticated$ = this._store$.pipe(
      select(AuthStoreSelectors.isAuthenticated)
    );
  }
}
