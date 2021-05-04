import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { issuesReducer } from './reducers';
import { IssuesEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    StoreModule.forFeature('issues', issuesReducer),
    EffectsModule.forFeature([IssuesEffects])
  ]
})
export class IssuesStateModule { }
