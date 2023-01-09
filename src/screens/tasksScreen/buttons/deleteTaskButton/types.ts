import { TaskListInterface, TaskType } from '@store/reducers/tasksReducer/types';

export type DeleteTaskButtonPropsType = {
  isTodoTaskList: boolean;
  taskID: TaskType['id'];
  taskTitle: TaskType['title'];
  fullTaskList: TaskListInterface;
};
