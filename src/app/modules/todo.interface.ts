export interface ITodo {
  [x: string]: any;
  id?: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isArchived: boolean;
  endDate: Date;
 // selected: boolean;
}
