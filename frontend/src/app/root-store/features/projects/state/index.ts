import { Project } from '@app/core/models/project.model';
import { BaseStateModel } from '@app/root-store/models/base-state.model';

export interface State extends BaseStateModel {
  projects: Project[];
  loading: boolean;
  errorMessage: string | null;
}

export const initialState: State = {
  projects: null,
  loading: false,
  errorMessage: null
};
