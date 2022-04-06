import {TaskListType} from '@store/reducers/tasksReducer/types';

export type CreateTaskButtonPropsType = {
  taskListId: string;
  taskListTitle: string;
  fullTaskList: TaskListType;
};
