import { AuthStoreState } from "../features/auth";
import { RouterStoreState } from "../features/router";
import { ProjectsStoreState } from "../features/projects";
import { TasksStoreState } from "../features/tasks";

export interface AppState {
    readonly auth: AuthStoreState.State;
    readonly router: RouterStoreState.State;
    readonly projects: ProjectsStoreState.State,
    readonly tasks: TasksStoreState.State
}