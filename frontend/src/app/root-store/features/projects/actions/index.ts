import { createAction, props } from '@ngrx/store';

import { Project } from '@app/core/models/project.model';
import { createConstants } from '@app/root-store/features/utils';

const typesNames = [
	'GET_PROJECTS',
	'GET_PROJECTS_SUCCESS',
	'GET_PROJECTS_FAILURE',
	'GET_PROJECT',
	'GET_PROJECT_SUCCESS',
	'GET_PROJECT_FAILURE',
	'DELETE_PROJECT',
	'DELETE_PROJECT_SUCCESS',
	'DELETE_PROJECT_FAILURE',
	'CREATE_PROJECT',
	'CREATE_PROJECT_SUCCESS',
	'CREATE_PROJECT_FAILURE',
	'UPDATE_PROJECT',
	'UPDATE_PROJECT_SUCCESS',
	'UPDATE_PROJECT_FAILURE',
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
);

export const getProjectsFailed = createAction(
	projectsActionTypes.GET_PROJECTS_FAILURE,
	props<{ message: string }>()
);

export const getProject = createAction(
	projectsActionTypes.GET_PROJECT
);

export const getProjectSuccess = createAction(
	projectsActionTypes.GET_PROJECT_SUCCESS,
	props<{ project: Project }>()
);

export const getProjectFailed = createAction(
	projectsActionTypes.GET_PROJECT_FAILURE,
	props<{ message: string }>()
);

export const deleteProject = createAction(
	projectsActionTypes.DELETE_PROJECT,
	props<{ projectId: string }>()
);

export const deleteProjectSuccess = createAction(
	projectsActionTypes.DELETE_PROJECT_SUCCESS,
	props<{ projectId: string }>()
);

export const deleteProjectFailed = createAction(
	projectsActionTypes.DELETE_PROJECT_FAILURE,
	props<{ message: string }>()
);

export const createProject = createAction(
	projectsActionTypes.CREATE_PROJECT,
	props<{ newProject: Project }>()
);

export const createProjectSuccess = createAction(
	projectsActionTypes.CREATE_PROJECT_SUCCESS,
	props<{ newProject: Project }>()
);

export const createProjectFailed = createAction(
	projectsActionTypes.CREATE_PROJECT_FAILURE,
	props<{ message: string }>()
);

export const updateProject = createAction(
	projectsActionTypes.UPDATE_PROJECT,
	props<{ projectId: string, updatedProject: Project }>()
);

export const updateProjectSuccess = createAction(
	projectsActionTypes.UPDATE_PROJECT_SUCCESS,
	props<{ updatedProject: Project }>()
);

export const updateProjectFailed = createAction(
	projectsActionTypes.UPDATE_PROJECT_FAILURE,
	props<{ message: string }>()
);
