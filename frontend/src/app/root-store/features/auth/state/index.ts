import { User } from '@app/core/models/user.model';
import { BaseStateModel } from '@app/root-store/models/base-state.model';

export interface State extends BaseStateModel {
  isAuthenticated: boolean | null;
  loading: boolean;
  errorMessage: string | null;
  currentUser?: User;
}

export const initialState: State = {
  isAuthenticated: null,
  currentUser: undefined,
  loading: false,
  errorMessage: null
};
