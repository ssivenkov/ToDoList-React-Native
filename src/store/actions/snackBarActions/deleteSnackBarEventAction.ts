import { SNACK_BAR_REDUCER_ACTION } from '@enums/snackBarReducerEnum';

export type DeleteSnackBarEventActionReturnType = {
  type: SNACK_BAR_REDUCER_ACTION.DELETE_EVENT;
};

export type DeleteSnackBarEventActionType = () => DeleteSnackBarEventActionReturnType;

export const deleteSnackBarEventAction: DeleteSnackBarEventActionType =
  (): DeleteSnackBarEventActionReturnType => ({
    type: SNACK_BAR_REDUCER_ACTION.DELETE_EVENT,
  });
