import {TaskListInterface} from '@store/reducers/tasksReducer/types';

export type CreateTaskButtonPropsType = {
  taskListId: string;
  taskListDate: string;
  taskListTitle: string;
  fullTaskList: TaskListInterface;
};
