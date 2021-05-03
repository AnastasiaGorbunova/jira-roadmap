import { SubTask, Task } from '@app/core/models/task.model';
import { BaseStateModel } from '@app/root-store/models/base-state.model';

export interface State extends BaseStateModel {
  tasks: { [projectId: string]: Task[] };
  subtasks: { [projectId: string]: SubTask[] };
  loading: boolean;
  errorMessage: string | null;
}

export const initialState: State = {
  tasks: null,
  subtasks: null,
  loading: false,
  errorMessage: null
};
