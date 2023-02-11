import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type isTodoTaskListType = boolean;

export type TaskListPropsType = {
  fullTaskList: TaskListType;
  isDoneCollapsed: boolean;
  isTodoCollapsed: boolean;
  isTodoTaskList: isTodoTaskListType;
  taskListDate: TaskListType['date'];
  taskListID: TaskListType['id'];
  taskListTitle: TaskListType['title'];

  taskListTasks?: TaskType[];
};
