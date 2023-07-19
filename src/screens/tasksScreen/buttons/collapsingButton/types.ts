import { TaskListPropsType } from '@components/taskList/types';
import { SetStateType } from '@root/types/common/types';
import { TaskListType } from '@store/reducers/tasksReducer/types';

export type CollapsingButtonPropsType = {
  isDoneCollapsed: TaskListPropsType['isDoneCollapsed'];
  isTodoCollapsed: TaskListPropsType['isTodoCollapsed'];
  isTodoTaskList: TaskListPropsType['isTodoTaskList'];
  taskListID: TaskListType['id'];
  taskListsCount: number;
};

export type SimpleCollapsingButtonPropsType = {
  isCollapsed: boolean;
  setIsCollapsed: SetStateType<boolean>;
};
