import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';

export type TaskPropsType = {
  isTodo: boolean;
  taskListID: string;
  taskTitle: TaskType['title'];
  colorMark?: TaskType['colorMark'];
  taskID: TaskType['id'];
  fullTaskList: TaskListInterface;
};
