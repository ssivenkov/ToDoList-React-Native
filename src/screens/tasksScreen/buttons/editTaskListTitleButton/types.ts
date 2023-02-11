import { SetStateType } from '@root/types/common/types';
import { TaskListType } from '@store/reducers/tasksReducer/types';

export type EditTaskListTitleButtonPropsType = {
  oldTaskListTitle: TaskListType['title'];
  setIsMenuHorizontalVisible: SetStateType<boolean>;
  taskListID: TaskListType['id'];
};
