import { USER_SAGA_ACTION } from '@enums/userSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { ThemeType } from '@store/reducers/userReducer/types';

export type ChangeDarkModeSagaPayloadType = {
  darkMode: ThemeType['darkMode'];
  setIsLoading: SetStateType<boolean>;
  theme: ThemeType;
};

export type ChangeDarkModeSagaActionReturnType = {
  payload: ChangeDarkModeSagaPayloadType;
  type: USER_SAGA_ACTION.CHANGE_DARK_MODE;
};

export type ChangeDarkModeSagaActionType = (
  payload: ChangeDarkModeSagaPayloadType,
) => ChangeDarkModeSagaActionReturnType;

export const changeDarkModeAction: ChangeDarkModeSagaActionType = (payload) => ({
  payload,
  type: USER_SAGA_ACTION.CHANGE_DARK_MODE,
});
