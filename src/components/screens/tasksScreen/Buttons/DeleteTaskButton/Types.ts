import {TaskListType} from '../../../../../store/reducers/taskListReducer/Types';

export type DeleteTaskButtonPropsType = {
  isTodoTaskList: boolean;
  taskId: string;
  taskTitle: string;
  fullTaskList: TaskListType;
};
