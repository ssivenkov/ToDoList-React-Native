import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';

export type TaskListPropsType = {
  id: string;
  date: string;
  title: string;
  isTodoTaskList: boolean;
  fullTaskList: TaskListInterface;

  tasks?: TaskType[];
};
