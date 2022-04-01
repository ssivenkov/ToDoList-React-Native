import {TaskListType} from '@store/reducers/taskListReducer/types';

export type DeleteTaskListButtonPropsType = {
  taskListTitle: string;
  isTodoTaskList: boolean;
  fullTaskList: TaskListType;
};
