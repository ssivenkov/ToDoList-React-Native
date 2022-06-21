import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { ThemeType } from '@store/reducers/userReducer/types';

type SetThemeActionPayloadType = {
  theme: ThemeType;
};

export type SetThemeActionReturnType = {
  type: USER_REDUCER_ACTION.SET_THEME;
  payload: SetThemeActionPayloadType;
};

export type SetThemeActionType = (
  payload: SetThemeActionPayloadType,
) => SetThemeActionReturnType;

export const setThemeAction: SetThemeActionType = (payload) => ({
  type: USER_REDUCER_ACTION.SET_THEME,
  payload,
});
