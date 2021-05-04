export interface User {
  id?: string;
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
}

export const unassigned = 'unassigned';
