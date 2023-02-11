import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { UserDataType } from '@store/reducers/userReducer/types';

type SetUserDataActionPayloadType = {
  userData: UserDataType;
};

export type SetUserDataActionReturnType = {
  payload: SetUserDataActionPayloadType;
  type: USER_REDUCER_ACTION.SET_USER_DATA;
};

export type SetUserDataActionType = (
  payload: SetUserDataActionPayloadType,
) => SetUserDataActionReturnType;

export const setUserDataAction: SetUserDataActionType = (payload) => ({
  payload,
  type: USER_REDUCER_ACTION.SET_USER_DATA,
});
