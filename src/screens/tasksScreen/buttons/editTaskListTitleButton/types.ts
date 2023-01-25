import { TaskListType } from '@store/reducers/tasksReducer/types';

export type EditTaskListTitleButtonPropsType = {
  oldTaskListTitle: TaskListType['title'];
  taskListID: TaskListType['id'];
};
