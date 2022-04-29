import {AUTH_ACTIONS} from '@enums/authEnum';
import {UserDataType} from '@store/reducers/authReducer/types';

type SetUserDataActionPayloadType = {
  userData: UserDataType;
};

export type SetUserDataActionReturnType = {
  type: AUTH_ACTIONS.SET_USER_DATA;
  payload: SetUserDataActionPayloadType;
};

export type SetUserDataActionType = (
  payload: SetUserDataActionPayloadType,
) => SetUserDataActionReturnType;

export const setUserDataAction: SetUserDataActionType = (payload) => ({
  type: AUTH_ACTIONS.SET_USER_DATA,
  payload,
});
