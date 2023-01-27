import { SetStateType } from '@root/types/common/types';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';
import { ColorType } from '@store/reducers/userReducer/types';

export type EditTaskTitleButtonPropsType = {
  taskListID: TaskListType['id'];
  taskID: TaskType['id'];
  oldTaskTitle: TaskType['title'];
  isTodo: boolean;
  setIsMenuHorizontalVisible: SetStateType<boolean>;

  colorMark?: ColorType;
};
