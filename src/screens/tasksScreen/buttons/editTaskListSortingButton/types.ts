import { SetStateType } from '@root/types/common/types';
import { TaskListType } from '@store/reducers/tasksReducer/types';

export type EditTaskListSortingButtonPropsType = {
  oldTaskListSorting: TaskListType['sorting'];
  setIsMenuHorizontalVisible: SetStateType<boolean>;
  taskListID: TaskListType['id'];
};
