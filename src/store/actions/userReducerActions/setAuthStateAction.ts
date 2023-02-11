import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { UserReducerStateType } from '@store/reducers/userReducer/types';

type SetAuthStateActionPayloadType = {
  accentColor: UserReducerStateType['accentColor'];
  emulatorStatusBarHeight: UserReducerStateType['emulatorStatusBarHeight'];
  isUserDataSynchronized: UserReducerStateType['isUserDataSynchronized'];
  isWaitingUserDataOnSignIn: UserReducerStateType['isWaitingUserDataOnSignIn'];
  providerID: UserReducerStateType['providerID'];
  selectedColor: UserReducerStateType['selectedColor'];
  userData: UserReducerStateType['userData'];
};

export type SetAuthStateActionReturnType = {
  payload: SetAuthStateActionPayloadType;
  type: USER_REDUCER_ACTION.SET_AUTH_STATE;
};

export type SetAuthStateActionType = (
  payload: SetAuthStateActionPayloadType,
) => SetAuthStateActionReturnType;

export const setAuthStateAction: SetAuthStateActionType = (payload) => ({
  payload,
  type: USER_REDUCER_ACTION.SET_AUTH_STATE,
});
