import {TaskListInterface} from '@store/reducers/tasksReducer/types';

export type DeleteTaskButtonPropsType = {
  isTodoTaskList: boolean;
  taskId: string;
  taskTitle: string;
  fullTaskList: TaskListInterface;
};
