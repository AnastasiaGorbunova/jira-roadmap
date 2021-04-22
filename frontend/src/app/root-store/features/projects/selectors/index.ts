import { createSelector } from '@ngrx/store';
import { Project } from 'src/app/core/models/project.model';
import { AppState } from 'src/app/root-store/state';
import { State as ProjectsState } from '../state';


export const projectsState = (state: AppState) => state.projects;

export const selectProjects = createSelector(
   projectsState,
  (state: ProjectsState): Project[] => {
      console.log('PROJECTS selector', (state || {}).projects);
      
      return (state || {}).projects;
  }
);
