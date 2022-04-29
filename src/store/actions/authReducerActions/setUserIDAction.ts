import {AUTH_ACTIONS} from '@enums/authEnum';
import {UserIDType} from '@store/reducers/authReducer/types';

type SetUserIDActionPayloadType = {
  userID: UserIDType;
};

export type SetUserIDActionReturnType = {
  type: AUTH_ACTIONS.SET_USER_ID;
  payload: SetUserIDActionPayloadType;
};

export type SetUserIDActionType = (
  payload: SetUserIDActionPayloadType,
) => SetUserIDActionReturnType;

export const setUserIDAction: SetUserIDActionType = (payload) => ({
  type: AUTH_ACTIONS.SET_USER_ID,
  payload,
});
