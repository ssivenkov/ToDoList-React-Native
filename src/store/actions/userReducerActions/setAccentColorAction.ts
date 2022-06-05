import {USER_REDUCER_ACTION} from '@enums/userReducerEnum';
import {AccentColorType} from '@store/reducers/userReducer/types';

type SetAccentColorActionPayloadType = {
  accentColor: AccentColorType;
};

export type SetAccentColorActionReturnType = {
  type: USER_REDUCER_ACTION.SET_ACCENT_COLOR;
  payload: SetAccentColorActionPayloadType;
};

export type SetAccentColorActionType = (
  payload: SetAccentColorActionPayloadType,
) => SetAccentColorActionReturnType;

export const setAccentColorAction: SetAccentColorActionType = (payload) => ({
  type: USER_REDUCER_ACTION.SET_ACCENT_COLOR,
  payload,
});
