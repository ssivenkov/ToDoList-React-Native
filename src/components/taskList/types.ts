import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type isTodoTaskListType = boolean;

export type TaskListPropsType = {
  taskListID: TaskListType['id'];
  taskListDate: TaskListType['date'];
  taskListTitle: TaskListType['title'];
  isTodoTaskList: isTodoTaskListType;
  isTodoCollapsed: boolean;
  isDoneCollapsed: boolean;
  fullTaskList: TaskListType;

  taskListTasks?: TaskType[];
};
