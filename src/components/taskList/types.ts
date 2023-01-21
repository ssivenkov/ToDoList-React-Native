import { TaskListInterface, TaskType } from '@store/reducers/tasksReducer/types';

export type isTodoTaskListType = boolean;

export type TaskListPropsType = {
  taskListID: TaskListInterface['id'];
  taskListDate: TaskListInterface['date'];
  taskListTitle: TaskListInterface['title'];
  isTodoTaskList: isTodoTaskListType;
  isTodoCollapsed: boolean;
  isDoneCollapsed: boolean;
  fullTaskList: TaskListInterface;

  taskListTasks?: TaskType[];
};
