import { SetStateType } from '@root/types/common/types';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';
import { ColorType } from '@store/reducers/userReducer/types';

export type EditTaskTitleButtonPropsType = {
  isTodo: boolean;
  oldTaskTitle: TaskType['title'];
  setIsMenuHorizontalVisible: SetStateType<boolean>;
  taskID: TaskType['id'];
  taskListID: TaskListType['id'];

  colorMark?: ColorType;
};
