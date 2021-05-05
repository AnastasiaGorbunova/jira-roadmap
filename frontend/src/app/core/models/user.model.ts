export interface User {
  id?: string;
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  projects?: {
    [projectId: string]: UserProjectRole;
  };
  role?: UserAccess;
}

export const unassigned = 'unassigned';

export enum UserProjectRole {
  Leader = 'leader',
  Participant = 'participant',
}

export enum UserAccess {
  Admin = 'admin',
  Basic = 'basic'
}
