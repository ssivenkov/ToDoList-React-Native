import { USER_SAGA_ACTION } from '@enums/userSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { ThemeType } from '@store/reducers/userReducer/types';

export type ChangeDarkModeSagaPayloadType = {
  darkMode: ThemeType['darkMode'];
  setIsLoading: SetStateType<boolean>;
  theme: ThemeType;
};

export type ChangeDarkModeSagaActionReturnType = {
  type: USER_SAGA_ACTION.CHANGE_DARK_MODE;
  payload: ChangeDarkModeSagaPayloadType;
};

export type ChangeDarkModeSagaActionType = (
  payload: ChangeDarkModeSagaPayloadType,
) => ChangeDarkModeSagaActionReturnType;

export const changeDarkModeAction: ChangeDarkModeSagaActionType = (payload) => ({
  type: USER_SAGA_ACTION.CHANGE_DARK_MODE,
  payload,
});
