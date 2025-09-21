export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export enum Status {
  All = 'All',
  Completed = 'Completed',
  Active = 'Active',
}
