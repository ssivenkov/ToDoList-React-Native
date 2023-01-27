import { TaskListType } from '@store/reducers/tasksReducer/types';

export type CreateTaskButtonPropsType = {
  fullTaskList: TaskListType;
  taskListDate: TaskListType['date'];
  taskListID: TaskListType['id'];
  taskListTitle: TaskListType['title'];
};
