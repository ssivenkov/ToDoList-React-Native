import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';

export type TaskPropsType = {
  isTodo: boolean;
  taskListId: string;
  taskTitle: TaskType['title'];
  taskId: TaskType['id'];
  fullTaskList: TaskListInterface;
};
