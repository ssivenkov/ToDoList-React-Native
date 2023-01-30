import { SetStateType } from '@root/types/common/types';
import { TaskListType } from '@store/reducers/tasksReducer/types';

export type DeleteTaskListButtonPropsType = {
  fullTaskList: TaskListType;
  isTodoTaskList: boolean;
  setIsMenuHorizontalVisible: SetStateType<boolean>;
  taskListTitle: TaskListType['title'];
};
