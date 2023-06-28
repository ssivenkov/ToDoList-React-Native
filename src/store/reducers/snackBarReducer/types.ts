import { MOVE_TASK_IN_DONE, MOVE_TASK_IN_TODO } from '@components/snackBar/actions';
import { Nullable } from '@root/types/common/types';
import { AddSnackBarEventActionReturnType } from '@store/actions/snackBarActions/addSnackBarEventAction';
import { DeleteSnackBarEventActionReturnType } from '@store/actions/snackBarActions/deleteSnackBarEventAction';
import { TaskListType, TaskType } from '@store/reducers/tasksReducer/types';

export type SnackBarEventType = {
  action: typeof MOVE_TASK_IN_TODO | typeof MOVE_TASK_IN_DONE | '';
  snackBarUntranslatedText: string;
  taskID: TaskType['id'];
  taskListID: TaskListType['id'];
  taskTitle: TaskType['title'];
};

export type SnackBarReducerStateType = {
  event: Nullable<SnackBarEventType>;
};

export type SnackBarReducerActionsType =
  | AddSnackBarEventActionReturnType
  | DeleteSnackBarEventActionReturnType;
