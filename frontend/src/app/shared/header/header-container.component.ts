import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthStoreActions } from 'src/app/root-store/features/auth';
import { AppState } from 'src/app/root-store/state';

@Component({
  selector: 'app-header-container',
  templateUrl: './header-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderContainerComponent implements OnInit {
  currentUser$: Observable<User>

  constructor(
    private _authService: AuthService,
    private _store$: Store<AppState>
  ) { }

  
  public signOutUser(): void {
    this._store$.dispatch(AuthStoreActions.signOut());
  }

  ngOnInit() {
    this.currentUser$ = this._authService.getCurrentUser();
  }
}
