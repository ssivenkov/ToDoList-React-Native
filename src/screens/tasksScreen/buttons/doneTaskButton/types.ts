import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type DoneTaskButtonPropsType = {
  doneTaskID: TaskType['id'];
  taskListID: TaskListType['id'];
};
