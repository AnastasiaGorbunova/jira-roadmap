import { createAction, props } from '@ngrx/store';

import { Project } from 'src/app/core/models/project.model';
import { createConstants } from 'src/app/root-store/features/utils';

const typesNames = [
	'GET_PROJECTS',
	'GET_PROJECTS_SUCCESS',
	'GET_PROJECTS_FAILURE'
] as const;

export type ProjectsActionType = {
	[Key in typeof typesNames[number]]: string;
};

export const prefix: string = 'PROJECTS';

export const projectsActionTypes: ProjectsActionType = createConstants<ProjectsActionType>(
	typesNames,
	prefix,
);

export const getProjects = createAction(
	projectsActionTypes.GET_PROJECTS
);

export const getProjectsSuccess = createAction(
	projectsActionTypes.GET_PROJECTS_SUCCESS,
	props<{ projects: Project[] }>()
);``

export const getProjectsFailed = createAction(
	projectsActionTypes.GET_PROJECTS_FAILURE,
	props<{ message: string }>()
);
