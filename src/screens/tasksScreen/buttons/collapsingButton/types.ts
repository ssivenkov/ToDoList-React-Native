import { TaskListPropsType } from '@components/taskList/types';
import { TaskListType } from '@store/reducers/tasksReducer/types';

export type CollapsingButtonPropsType = {
  isTodoTaskList: TaskListPropsType['isTodoTaskList'];
  taskListID: TaskListType['id'];
  isTodoCollapsed: TaskListPropsType['isTodoCollapsed'];
  isDoneCollapsed: TaskListPropsType['isDoneCollapsed'];
  taskListsCount: number;
};
