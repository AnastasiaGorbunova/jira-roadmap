import { User } from '@app/core/models/user.model';
import { BaseStateModel } from '@app/root-store/models/base-state.model';

export interface State extends BaseStateModel {
  users: User[];
  loading: boolean;
  errorMessage: string | null;
}

export const initialState: State = {
  users: null,
  loading: false,
  errorMessage: null
};
