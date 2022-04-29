import {TaskListInterface} from '@store/reducers/tasksReducer/types';

export type EditTaskListTitleButtonPropsType = {
  oldTaskListTitle: TaskListInterface['title'];
  taskListId: TaskListInterface['id'];
};
