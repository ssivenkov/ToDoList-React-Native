import {TaskListType} from '../../../store/reducers/taskListReducer/Types';

export type TaskPropsType = {
  isTodo: boolean;
  taskListId: string;
  taskTitle: string;
  taskId: string;
  fullTaskList: TaskListType;
};
