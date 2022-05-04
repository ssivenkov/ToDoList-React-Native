import {AUTH_ACTION} from '@enums/authEnum';
import {UserIDType} from '@store/reducers/authReducer/types';

type SetUserIDActionPayloadType = {
  userID: UserIDType;
};

export type SetUserIDActionReturnType = {
  type: AUTH_ACTION.SET_USER_ID;
  payload: SetUserIDActionPayloadType;
};

export type SetUserIDActionType = (
  payload: SetUserIDActionPayloadType,
) => SetUserIDActionReturnType;

export const setUserIDAction: SetUserIDActionType = (payload) => ({
  type: AUTH_ACTION.SET_USER_ID,
  payload,
});
