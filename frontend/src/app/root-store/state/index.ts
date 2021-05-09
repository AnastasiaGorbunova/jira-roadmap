import { AuthStoreState } from '@app/root-store/features/auth';
import { RouterStoreState } from '@app/root-store/features/router';
import { ProjectsStoreState } from '@app/root-store/features/projects';
import { IssuesStoreState } from '@app/root-store/features/issues';
import { UsersStoreState } from '@app/root-store/features/users';

export interface AppState {
    readonly auth: AuthStoreState.State;
    readonly router: RouterStoreState.State;
    readonly projects: ProjectsStoreState.State,
    readonly issues: IssuesStoreState.State,
    readonly users: UsersStoreState.State
}