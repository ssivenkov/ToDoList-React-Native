import {TaskListType} from '../../../../../store/reducers/taskListReducer/Types';

export type CreateTaskButtonPropsType = {
  taskListId: string;
  taskListTitle: string;
  fullTaskList: TaskListType;
};
