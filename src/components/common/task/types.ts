import {TaskListInterface} from '@store/reducers/tasksReducer/types';

export type TaskPropsType = {
  isTodo: boolean;
  taskListId: string;
  taskTitle: string;
  taskId: string;
  fullTaskList: TaskListInterface;
};
