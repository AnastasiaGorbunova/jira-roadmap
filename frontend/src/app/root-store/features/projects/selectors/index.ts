import { createSelector } from '@ngrx/store';

import { Project } from '@app/core/models/project.model';
import { AppState } from '@app/root-store/state';
import { selectedProjectId } from '@app/root-store/features/router/selectors';
import { State as ProjectsState } from '@app/root-store/features/projects/state';

export const projectsState = (state: AppState) => state.projects;

export const selectProjects = createSelector(
   projectsState,
  (state: ProjectsState): Project[] => (state || {}).projects || []
);

export const selectedProject = createSelector(
  selectProjects,
  selectedProjectId,
  (projects: Project[], projectId: string): Project => projects.find(project => project.id === projectId)
);
