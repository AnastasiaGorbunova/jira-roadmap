import { Task } from "src/app/core/models/task.model";
import { BaseStateModel } from "src/app/root-store/models/base-state.model";

export interface State extends BaseStateModel {
  tasks: { [projectId: string]: Task[] };
  loading: boolean;
  errorMessage: string | null;
}

export const initialState: State = {
  tasks: null,
  loading: false,
  errorMessage: null
};
