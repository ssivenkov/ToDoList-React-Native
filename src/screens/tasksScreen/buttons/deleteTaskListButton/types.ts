import { TaskListType } from '@store/reducers/tasksReducer/types';

export type DeleteTaskListButtonPropsType = {
  fullTaskList: TaskListType;
  isTodoTaskList: boolean;
  taskListTitle: TaskListType['title'];
};
