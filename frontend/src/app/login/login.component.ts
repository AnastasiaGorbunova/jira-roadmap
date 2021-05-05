import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '@app/core/models/user.model';
import { AuthStoreActions, AuthStoreSelectors } from '@app/root-store/features/auth';
import { AppState } from '@app/root-store/state';
import { validationMessages } from '@app/login/login.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  authError$: Observable<string>;
  loginForm: FormGroup;

  validationMessages = validationMessages;
  isLogin = true;

  constructor(
    private _store$: Store<AppState>
  ) { }

  get signPostfix(): string {
    return this.isLogin ? 'In' : 'Up';
  }

  get email(): AbstractControl {
    return this.loginForm.controls.email;
  }

  get password(): AbstractControl {
    return this.loginForm.controls.password;
  }

  get firstName(): AbstractControl {
    return this.loginForm.controls.firstName;
  }

  get lastName(): AbstractControl {
    return this.loginForm.controls.lastName;
  }

  auth(): void {
    const userCredentials = {
      email: `${this.email.value?.toLowerCase()}`,
      password: this.password.value
    };

    const authData: User = !this.isLogin
      ? {
        ...userCredentials,
        first_name: this.firstName.value,
        last_name: this.lastName.value
      }
      : userCredentials;

    const signAction = this.isLogin ? 'signIn' : 'signUp';
    this._store$.dispatch(AuthStoreActions[signAction]({ authData }));
  }

  toggleLoginForm(): void {
    this.isLogin = !this.isLogin;
    this._store$.dispatch(AuthStoreActions.clearAuthError());
  }

  ngOnInit() {
    this.initializeForm();
    this.getAuthErrors();
  }

  private getAuthErrors(): void {
    this.authError$ = this._store$.pipe(
      select(AuthStoreSelectors.getAuthErrorMessage)
    );
  }

  // TODO: add more validation rules
  private initializeForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      firstName: new FormControl({ value: '', disabled: !this.isLogin }, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      lastName: new FormControl({ value: '', disabled: !this.isLogin }, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
    });
  }
}
