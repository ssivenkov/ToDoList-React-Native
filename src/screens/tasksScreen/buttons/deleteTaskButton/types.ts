import { SetStateType } from '@root/types/common/types';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type DeleteTaskButtonPropsType = {
  fullTaskList: TaskListType;
  isTodoTaskList: boolean;
  setIsMenuHorizontalVisible: SetStateType<boolean>;
  taskID: TaskType['id'];
  taskTitle: TaskType['title'];
};
