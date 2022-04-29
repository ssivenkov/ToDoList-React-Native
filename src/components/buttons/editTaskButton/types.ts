import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';

export type EditTaskTitleButtonPropsType = {
  taskListId: TaskListInterface['id'];
  taskId: TaskType['id'];
  oldTaskTitle: TaskType['title'];
  isTodo: boolean;
};
