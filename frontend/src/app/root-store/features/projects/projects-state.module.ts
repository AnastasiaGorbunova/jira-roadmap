import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { projectsReducer } from './reducers';
import { ProjectsEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    StoreModule.forFeature('projects', projectsReducer),
    EffectsModule.forFeature([ProjectsEffects])
  ]
})
export class ProjectsStateModule { }
