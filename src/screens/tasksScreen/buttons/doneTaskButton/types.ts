import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type DoneTaskButtonPropsType = {
  taskListID: TaskListType['id'];
  doneTaskID: TaskType['id'];
  completedTaskTitle: TaskType['title'];
};
