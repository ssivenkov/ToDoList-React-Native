import {TaskListInterface} from '@store/reducers/tasksReducer/types';

export type DeleteTaskListButtonPropsType = {
  taskListTitle: TaskListInterface['title'];
  isTodoTaskList: boolean;
  fullTaskList: TaskListInterface;
};
