import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { UserReducerStateType } from '@store/reducers/userReducer/types';

type SetTextSizesActionPayloadType = {
  modalButtonTextSize: UserReducerStateType['modalButtonTextSize'];
  modalWindowTextSize: UserReducerStateType['modalWindowTextSize'];
  notepadTextSize: UserReducerStateType['notepadTextSize'];
  taskListTitleSize: UserReducerStateType['taskListTitleSize'];
  taskTextSize: UserReducerStateType['taskTextSize'];
};

export type SetTextSizesActionReturnType = {
  payload: SetTextSizesActionPayloadType;
  type: USER_REDUCER_ACTION.SET_TEXT_SIZES;
};

export type SetTextSizesActionType = (
  payload: SetTextSizesActionPayloadType,
) => SetTextSizesActionReturnType;

export const setTextSizesAction: SetTextSizesActionType = (payload) => ({
  payload,
  type: USER_REDUCER_ACTION.SET_TEXT_SIZES,
});
