import { Issue } from '@app/core/models/issue.model';
import { BaseStateModel } from '@app/root-store/models/base-state.model';

export interface State extends BaseStateModel {
  issues: { [projectId: string]: Issue[] };
  loading: boolean;
  errorMessage: string | null;
}

export const initialState: State = {
  issues: null,
  loading: false,
  errorMessage: null
};
