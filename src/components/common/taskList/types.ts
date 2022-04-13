import {TaskListType, TaskType} from '@store/reducers/tasksReducer/types';

export type TaskListPropsType = {
  taskListId: string;
  taskListDate: string;
  taskListTitle: string;
  taskListPropsTasks?: TaskType[];
  isTodoTaskList: boolean;
  fullTaskList: TaskListType;
};
