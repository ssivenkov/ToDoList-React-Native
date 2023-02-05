import { moveTaskInDone, moveTaskInTodo } from '@components/snackBar/actions';
import { Nullable } from '@root/types/common/types';
import { AddSnackBarEventActionReturnType } from '@store/actions/snackBarActions/addSnackBarEventAction';
import { DeleteSnackBarEventActionReturnType } from '@store/actions/snackBarActions/deleteSnackBarEventAction';

export type SnackBarEventType = {
  action: typeof moveTaskInTodo | typeof moveTaskInDone | '';
  snackBarUntranslatedText: string;
  taskID: string;
  taskListID: string;
};

export type SnackBarReducerStateType = {
  event: Nullable<SnackBarEventType>;
};

export type SnackBarReducerActionsType =
  | AddSnackBarEventActionReturnType
  | DeleteSnackBarEventActionReturnType;
