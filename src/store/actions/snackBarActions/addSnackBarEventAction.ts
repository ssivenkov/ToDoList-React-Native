import { SNACK_BAR_REDUCER_ACTION } from '@enums/snackBarReducerEnum';
import { SnackBarEventType } from '@store/reducers/snackBarReducer/types';

type AddSnackBarEventActionPayloadType = {
  event: SnackBarEventType;
};

export type AddSnackBarEventActionReturnType = {
  payload: AddSnackBarEventActionPayloadType;
  type: SNACK_BAR_REDUCER_ACTION.ADD_EVENT;
};

export type AddSnackBarEventActionType = (
  payload: AddSnackBarEventActionPayloadType,
) => AddSnackBarEventActionReturnType;

export const addSnackBarEventAction: AddSnackBarEventActionType = (
  payload,
): AddSnackBarEventActionReturnType => ({
  payload,
  type: SNACK_BAR_REDUCER_ACTION.ADD_EVENT,
});
