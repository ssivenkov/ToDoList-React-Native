import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type DoneTaskButtonPropsType = {
  completedTaskTitle: TaskType['title'];
  doneTaskID: TaskType['id'];
  taskListID: TaskListType['id'];
};
