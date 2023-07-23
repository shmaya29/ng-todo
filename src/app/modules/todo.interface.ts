export interface ITodo {
  title: string;
  description: string;
  isCompleted: boolean;
  isArchived: boolean;
  endDate: Date | number | string;
}
