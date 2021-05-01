import { createAction, props } from '@ngrx/store';

import { createConstants } from '@app/root-store/features/utils';
import { User } from '@app/core/models/user.model';

const typesNames = [
	'GET_USERS',
	'GET_USERS_SUCCESS',
	'GET_USERS_FAILURE',
] as const;

export type UsersActionType = {
	[Key in typeof typesNames[number]]: string;
};

export const prefix: string = 'USERS';

export const usersActionTypes: UsersActionType = createConstants<UsersActionType>(
	typesNames,
	prefix,
);

export const getUsers = createAction(
	usersActionTypes.GET_USERS
);

export const getUsersSuccess = createAction(
	usersActionTypes.GET_USERS_SUCCESS,
	props<{ users: User[] }>()
);

export const getUsersFailed = createAction(
	usersActionTypes.GET_USERS_FAILURE,
	props<{ message: string }>()
);
