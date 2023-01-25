import { TaskListType } from '@store/reducers/tasksReducer/types';

export type DeleteTaskListButtonPropsType = {
  taskListTitle: TaskListType['title'];
  isTodoTaskList: boolean;
  fullTaskList: TaskListType;
};
