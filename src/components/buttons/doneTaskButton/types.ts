import {TaskListInterface, TaskType} from '@store/reducers/tasksReducer/types';

export type DoneTaskButtonPropsType = {
  taskListId: TaskListInterface['id'];
  doneTaskId: TaskType['id'];
  completedTaskTitle: TaskType['title'];
};
