import {
  TaskListType,
  TaskType,
} from '../../../store/reducers/taskListReducer/Types';

export type TaskListPropsType = {
  taskListId: string;
  taskListTitle: string;
  taskListPropsTasks: TaskType[];
  isTodoTaskList: boolean;
  fullTaskList: TaskListType;
};
