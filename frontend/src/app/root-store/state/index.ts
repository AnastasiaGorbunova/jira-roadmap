import { AuthStoreState } from "../features/auth";
import { RouterStoreState } from "../features/router";
import { ProjectsStoreState } from "../features/projects";

export interface AppState {
    readonly auth: AuthStoreState.State;
    readonly router: RouterStoreState.State;
    readonly projects: ProjectsStoreState.State
}