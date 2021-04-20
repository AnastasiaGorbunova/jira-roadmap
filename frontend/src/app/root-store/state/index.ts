import { AuthStoreState } from "../features/auth";

export interface AppState {
    readonly auth: AuthStoreState.State;
}