import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';

export type EditTaskTitleButtonPropsType = {
  taskListID: TaskListInterface['id'];
  taskID: TaskType['id'];
  oldTaskTitle: TaskType['title'];
  isTodo: boolean;
};
