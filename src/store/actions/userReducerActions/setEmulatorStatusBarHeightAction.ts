import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { UserReducerStateType } from '@store/reducers/userReducer/types';

type SetEmulatorStatusBarHeightActionPayloadType = {
  emulatorStatusBarHeight: UserReducerStateType['emulatorStatusBarHeight'];
};

export type SetEmulatorStatusBarHeightActionReturnType = {
  payload: SetEmulatorStatusBarHeightActionPayloadType;
  type: USER_REDUCER_ACTION.SET_EMULATOR_STATUS_BAR_HEIGHT;
};

export type SetEmulatorStatusBarHeightActionType = (
  payload: SetEmulatorStatusBarHeightActionPayloadType,
) => SetEmulatorStatusBarHeightActionReturnType;

export const setEmulatorStatusBarHeightAction: SetEmulatorStatusBarHeightActionType = (
  payload,
) => ({
  payload,
  type: USER_REDUCER_ACTION.SET_EMULATOR_STATUS_BAR_HEIGHT,
});
