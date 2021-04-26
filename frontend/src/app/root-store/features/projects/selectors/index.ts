import { createSelector } from '@ngrx/store';
import { Project } from 'src/app/core/models/project.model';
import { AppState } from 'src/app/root-store/state';
import { selectedProjectId } from '../../router/selectors';
import { State as ProjectsState } from '../state';


export const projectsState = (state: AppState) => state.projects;

export const selectProjects = createSelector(
   projectsState,
  (state: ProjectsState): Project[] => {
      console.log('PROJECTS selector', (state || {}).projects);
      
      return (state || {}).projects;
  }
);

export const selectedProject = createSelector(
  selectProjects,
  selectedProjectId,
  (projects: Project[], projectId: string): Project => {
     
     return (projects || []).find(project => project.id === projectId);
 }
);
