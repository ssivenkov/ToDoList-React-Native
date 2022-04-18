import {TaskListType, TaskType} from '@store/reducers/tasksReducer/types';

export type TaskListPropsType = {
  id: string;
  date: string;
  title: string;
  isTodoTaskList: boolean;
  fullTaskList: TaskListType;

  tasks?: TaskType[];
};
