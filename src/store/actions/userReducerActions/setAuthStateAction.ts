import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { UserReducerStateType } from '@store/reducers/userReducer/types';

type SetAuthStateActionPayloadType = {
  userData: UserReducerStateType['userData'];
  providerID: UserReducerStateType['providerID'];
  isUserDataSynchronized: UserReducerStateType['isUserDataSynchronized'];
};

export type SetAuthStateActionReturnType = {
  type: USER_REDUCER_ACTION.SET_AUTH_STATE;
  payload: SetAuthStateActionPayloadType;
};

export type SetAuthStateActionType = (
  payload: SetAuthStateActionPayloadType,
) => SetAuthStateActionReturnType;

export const setAuthStateAction: SetAuthStateActionType = (payload) => ({
  type: USER_REDUCER_ACTION.SET_AUTH_STATE,
  payload,
});
