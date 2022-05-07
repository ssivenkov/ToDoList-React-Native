import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';

export type TaskPropsType = {
  isTodo: boolean;
  taskListID: string;
  taskTitle: TaskType['title'];
  taskID: TaskType['id'];
  fullTaskList: TaskListInterface;
};
