import {TaskListType} from '@store/reducers/tasksReducer/types';

export type DeleteTaskListButtonPropsType = {
  taskListTitle: string;
  isTodoTaskList: boolean;
  fullTaskList: TaskListType;
};
