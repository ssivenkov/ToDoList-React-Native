import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';

export type TaskListPropsType = {
  id: TaskListInterface['id'];
  date: TaskListInterface['date'];
  title: TaskListInterface['title'];
  isTodoTaskList: boolean;
  fullTaskList: TaskListInterface;

  tasks?: TaskType[];
};
