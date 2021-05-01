import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { usersReducer } from './reducers';
import { UsersEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UsersEffects])
  ]
})
export class UsersStateModule { }
