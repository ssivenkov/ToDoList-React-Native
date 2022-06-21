import { TaskListInterface, TaskType } from '@store/reducers/tasksReducer/types';

export type DoneTaskButtonPropsType = {
  taskListID: TaskListInterface['id'];
  doneTaskID: TaskType['id'];
  completedTaskTitle: TaskType['title'];
};
