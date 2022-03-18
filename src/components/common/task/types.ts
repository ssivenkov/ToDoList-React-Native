import {TaskListType} from '../../../store/reducers/taskListReducer/types';

export type TaskPropsType = {
  isTodo: boolean;
  taskListId: string;
  taskTitle: string;
  taskId: string;
  fullTaskList: TaskListType;
};
