import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type TaskPropsType = {
  date: TaskType['date'];
  fullTaskList: TaskListType;
  isTodo: boolean;
  modificationDate: TaskType['modificationDate'];
  taskID: TaskType['id'];
  taskListID: string;
  taskTitle: TaskType['title'];

  colorMark?: TaskType['colorMark'];
};

export type TaskVisualExamplePropsType = Pick<TaskPropsType, 'taskTitle'> & {
  textSize: number;
};

export type IsMenuHorizontalVisibleType = boolean;
