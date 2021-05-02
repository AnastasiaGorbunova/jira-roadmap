import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { tasksReducer } from './reducers';
import { TasksEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    StoreModule.forFeature('tasks', tasksReducer),
    EffectsModule.forFeature([TasksEffects])
  ]
})
export class TasksStateModule { }
