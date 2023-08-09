import { ReactNode } from 'react';

import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type isTodoTaskListType = boolean;

export type TaskListPropsType = {
  fullTaskList: TaskListType;
  isDoneCollapsed: boolean;
  isTodoCollapsed: boolean;
  isTodoTaskList: isTodoTaskListType;
  sorting: TaskListType['sorting'];
  taskListDate: TaskListType['date'];
  taskListID: TaskListType['id'];
  taskListTitle: TaskListType['title'];
  taskListTasks?: TaskType[];
};

export type TaskListVisualExamplePropsType = {
  taskListTitleSize: number;
  tasks: ReactNode;
  title: TaskListPropsType['taskListTitle'];
};
