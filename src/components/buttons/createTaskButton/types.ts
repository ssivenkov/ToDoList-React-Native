import {TaskListType} from '../../../store/reducers/taskListReducer/types';

export type CreateTaskButtonPropsType = {
  taskListId: string;
  taskListTitle: string;
  fullTaskList: TaskListType;
};
