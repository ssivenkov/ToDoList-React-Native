import { TaskListPropsType } from '@components/common/taskList/types';
import { TaskListInterface } from '@store/reducers/tasksReducer/types';

export type CollapsingButtonPropsType = {
  isTodoTaskList: TaskListPropsType['isTodoTaskList'];
  taskListID: TaskListInterface['id'];
  isTodoCollapsed: TaskListPropsType['isTodoCollapsed'];
  isDoneCollapsed: TaskListPropsType['isDoneCollapsed'];
  taskListsCount: number;
};
