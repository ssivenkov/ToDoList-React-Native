import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { ThemeType } from '@store/reducers/userReducer/types';

type SetThemeActionPayloadType = {
  theme: ThemeType;
};

export type SetThemeActionReturnType = {
  payload: SetThemeActionPayloadType;
  type: USER_REDUCER_ACTION.SET_THEME;
};

export type SetThemeActionType = (
  payload: SetThemeActionPayloadType,
) => SetThemeActionReturnType;

export const setThemeAction: SetThemeActionType = (payload) => ({
  payload,
  type: USER_REDUCER_ACTION.SET_THEME,
});
