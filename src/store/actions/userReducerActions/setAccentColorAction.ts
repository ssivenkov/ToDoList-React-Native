import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { ColorType } from '@store/reducers/userReducer/types';

type SetAccentColorActionPayloadType = {
  accentColor: ColorType;
};

export type SetAccentColorActionReturnType = {
  payload: SetAccentColorActionPayloadType;
  type: USER_REDUCER_ACTION.SET_ACCENT_COLOR;
};

export type SetAccentColorActionType = (
  payload: SetAccentColorActionPayloadType,
) => SetAccentColorActionReturnType;

export const setAccentColorAction: SetAccentColorActionType = (payload) => ({
  payload,
  type: USER_REDUCER_ACTION.SET_ACCENT_COLOR,
});
