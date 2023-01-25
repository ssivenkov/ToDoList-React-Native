import { TaskListType } from '@store/reducers/tasksReducer/types';

export type CreateTaskButtonPropsType = {
  taskListID: TaskListType['id'];
  taskListDate: TaskListType['date'];
  taskListTitle: TaskListType['title'];
  fullTaskList: TaskListType;
};
