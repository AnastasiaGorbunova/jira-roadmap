import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { 
  AbstractControlOptions, 
  FormControl, 
  FormGroup, 
  ValidatorFn, 
  Validators 
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '@app/core/models/user.model';
import { AuthStoreActions, AuthStoreSelectors } from '@app/root-store/features/auth';
import { AppState } from '@app/root-store/state';
import { EMAIL_VALIDATION_REGEXP, validationMessages } from '@app/login/login.constants';

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

  get isFormInvalid(): boolean {
    if (this.isLogin) {
      const { email, password } = this.loginForm.controls || {};
      return email.invalid || password.invalid;
    }

    return this.loginForm.invalid;
  }

  get signPostfix(): string {
    return this.isLogin ? 'In' : 'Up';
  }

  auth(): void {
    const { email, password } = this.loginForm.value;

    const authData: User = !this.isLogin
      ? this.loginForm.value
      : { email: email.toLowerCase(), password };

    const signAction = this.isLogin ? 'signIn' : 'signUp';
    this._store$.dispatch(AuthStoreActions[signAction]({ authData }));
  }

  toggleLoginForm(): void {
    this.isLogin = !this.isLogin;
    this.loginForm.reset();
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

  private initializeForm(): void {

    const basicControlOptions = {
      validators: [Validators.required],
      updateOn: 'blur',
    } as ValidatorFn | ValidatorFn[] | AbstractControlOptions;

    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(EMAIL_VALIDATION_REGEXP)
        ],
        updateOn: 'blur'
      }),
      password: new FormControl('', basicControlOptions),
      firstName: new FormControl(
        {
          value: '',
          disabled: !this.isLogin
        },
        basicControlOptions
      ),
      lastName: new FormControl(
        {
          value: '',
          disabled: !this.isLogin
        },
        basicControlOptions
      ),
    });
  }
}
