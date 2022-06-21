import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { ProviderIDType, UserDataType } from '@store/reducers/userReducer/types';

type SetAuthStateActionPayloadType = {
  userData: UserDataType;
  providerID: ProviderIDType;
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
