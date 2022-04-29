import {TaskListInterface} from '@store/reducers/tasksReducer/types';

export type CreateTaskButtonPropsType = {
  taskListId: TaskListInterface['id'];
  taskListDate: TaskListInterface['date'];
  taskListTitle: TaskListInterface['title'];
  fullTaskList: TaskListInterface;
};
