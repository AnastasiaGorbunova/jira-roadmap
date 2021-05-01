import { AuthStoreState } from '@app/root-store/features/auth';
import { RouterStoreState } from '@app/root-store/features/router';
import { ProjectsStoreState } from '@app/root-store/features/projects';
import { TasksStoreState } from '@app/root-store/features/tasks';
import { UsersStoreState } from '@app/root-store/features/users';

export interface AppState {
    readonly auth: AuthStoreState.State;
    readonly router: RouterStoreState.State;
    readonly projects: ProjectsStoreState.State,
    readonly tasks: TasksStoreState.State,
    readonly users: UsersStoreState.State
}