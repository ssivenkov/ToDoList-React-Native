import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type TaskPropsType = {
  fullTaskList: TaskListType;
  isTodo: boolean;
  taskID: TaskType['id'];
  taskListID: string;
  taskTitle: TaskType['title'];
  colorMark?: TaskType['colorMark'];
};

export type IsMenuVisibleType = boolean;
