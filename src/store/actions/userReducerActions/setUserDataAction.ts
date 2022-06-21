import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { UserDataType } from '@store/reducers/userReducer/types';

type SetUserDataActionPayloadType = {
  userData: UserDataType;
};

export type SetUserDataActionReturnType = {
  type: USER_REDUCER_ACTION.SET_USER_DATA;
  payload: SetUserDataActionPayloadType;
};

export type SetUserDataActionType = (
  payload: SetUserDataActionPayloadType,
) => SetUserDataActionReturnType;

export const setUserDataAction: SetUserDataActionType = (payload) => ({
  type: USER_REDUCER_ACTION.SET_USER_DATA,
  payload,
});
