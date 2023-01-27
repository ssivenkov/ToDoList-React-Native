import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { ColorType } from '@store/reducers/userReducer/types';

type SetSelectedColorActionPayloadType = {
  selectedColor: ColorType;
};

export type SetSelectedColorActionReturnType = {
  payload: SetSelectedColorActionPayloadType;
  type: USER_REDUCER_ACTION.SET_SELECTED_COLOR;
};

export type SetSelectedColorActionType = (
  payload: SetSelectedColorActionPayloadType,
) => SetSelectedColorActionReturnType;

export const setSelectedColorAction: SetSelectedColorActionType = (payload) => ({
  payload,
  type: USER_REDUCER_ACTION.SET_SELECTED_COLOR,
});
