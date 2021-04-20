import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../core/models/user.model';
import { AuthStoreActions } from '../root-store/features/auth';
import { AppState } from '../root-store/state';

import { validationMessages } from './login.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  validationMessages = validationMessages;
  isLoginFormSelected = true;

  constructor(
    private _store$: Store<AppState>,
    private afAuth: AngularFireAuth
  ) { }

  // TODO: think about making separate components for auth and registration
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

  // TODO: change name to auth
  logIn(): void {
    // TODO: event stopPr

    const userCredentials = {          
      email: `${this.email.value?.toLowerCase()}`,
      password: this.password.value
    };
    
      const authData: User = !this.isLoginFormSelected 
      ? {
          ...userCredentials,
          first_name: this.firstName.value,
          last_name: this.lastName.value
        }
      : userCredentials;
      
    if (!this.isLoginFormSelected) {
      this._store$.dispatch(AuthStoreActions.signUp({ authData }));
    }
  }

  toggleLoginForm(): void {
    // this.afAuth.user.subscribe((user) => console.log(user.uid));
    
    this.isLoginFormSelected = !this.isLoginFormSelected;
  }

  ngOnInit() {
    this.initializeForm();
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
      firstName: new FormControl({ value: '', disabled: !this.isLoginFormSelected }, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      lastName: new FormControl({ value: '', disabled: !this.isLoginFormSelected }, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
    });
  }
}
