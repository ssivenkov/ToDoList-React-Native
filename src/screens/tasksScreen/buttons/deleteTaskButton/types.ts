import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type DeleteTaskButtonPropsType = {
  fullTaskList: TaskListType;
  isTodoTaskList: boolean;
  taskID: TaskType['id'];
  taskTitle: TaskType['title'];
};
