import {TaskListType} from '@store/reducers/taskListReducer/types';

export type DeleteTaskButtonPropsType = {
  isTodoTaskList: boolean;
  taskId: string;
  taskTitle: string;
  fullTaskList: TaskListType;
};
