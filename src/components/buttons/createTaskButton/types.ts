import { TaskListInterface } from '@store/reducers/tasksReducer/types';

export type CreateTaskButtonPropsType = {
  taskListID: TaskListInterface['id'];
  taskListDate: TaskListInterface['date'];
  taskListTitle: TaskListInterface['title'];
  fullTaskList: TaskListInterface;
};
