import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '@app/core/models/user.model';
import { AuthStoreActions, AuthStoreSelectors } from '@app/root-store/features/auth';
import { RouterStoreActions } from '@app/root-store/features/router';
import { AppState } from '@app/root-store/state';

@Component({
  selector: 'app-header-container',
  templateUrl: './header-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderContainerComponent implements OnInit {
  currentUser$: Observable<User>

  constructor(
    private _store$: Store<AppState>
  ) { }

  signOutUser(): void {
    this._store$.dispatch(AuthStoreActions.signOut());
  }

  navigateToBoard(): void {
    this._store$.dispatch(RouterStoreActions.navigateProjectsBoard());
  }

  ngOnInit() {
    this.currentUser$ = this._store$.pipe(select(AuthStoreSelectors.currentUser));
  }
}
