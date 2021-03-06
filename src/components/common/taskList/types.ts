import { TaskListInterface, TaskType } from '@store/reducers/tasksReducer/types';

export type TaskListPropsType = {
  taskListID: TaskListInterface['id'];
  taskListDate: TaskListInterface['date'];
  taskListTitle: TaskListInterface['title'];
  isTodoTaskList: boolean;
  fullTaskList: TaskListInterface;

  taskListTasks?: TaskType[];
};
