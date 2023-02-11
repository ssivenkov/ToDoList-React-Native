import { USER_SAGA_ACTION } from '@enums/userSagaEnum';
import { SetStateType } from '@root/types/common/types';
import { ColorType } from '@store/reducers/userReducer/types';

export type ChangeAccentColorSagaPayloadType = {
  accentColor: ColorType;
  setIsLoading: SetStateType<boolean>;
};

export type ChangeAccentColorSagaActionReturnType = {
  payload: ChangeAccentColorSagaPayloadType;
  type: USER_SAGA_ACTION.CHANGE_ACCENT_COLOR;
};

export type ChangeAccentColorSagaActionType = (
  payload: ChangeAccentColorSagaPayloadType,
) => ChangeAccentColorSagaActionReturnType;

export const changeAccentColorAction: ChangeAccentColorSagaActionType = (payload) => ({
  payload,
  type: USER_SAGA_ACTION.CHANGE_ACCENT_COLOR,
});
