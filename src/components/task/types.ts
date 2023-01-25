import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type TaskPropsType = {
  isTodo: boolean;
  taskListID: string;
  taskTitle: TaskType['title'];
  colorMark?: TaskType['colorMark'];
  taskID: TaskType['id'];
  fullTaskList: TaskListType;
};

export type IsMenuVisibleType = boolean;
