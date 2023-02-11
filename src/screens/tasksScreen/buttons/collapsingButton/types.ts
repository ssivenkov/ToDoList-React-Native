import { TaskListPropsType } from '@components/taskList/types';
import { TaskListType } from '@store/reducers/tasksReducer/types';

export type CollapsingButtonPropsType = {
  isDoneCollapsed: TaskListPropsType['isDoneCollapsed'];
  isTodoCollapsed: TaskListPropsType['isTodoCollapsed'];
  isTodoTaskList: TaskListPropsType['isTodoTaskList'];
  taskListID: TaskListType['id'];
  taskListsCount: number;
};
