import {AUTH_ACTIONS} from '@enums/authEnum';
import {Nullable} from '@root/types/common/types';

type SetUserIDActionPayloadType = {
  userID: Nullable<string>;
};

export type SetUserIDActionReturnType = {
  type: AUTH_ACTIONS.SET_USER_ID;
  payload: SetUserIDActionPayloadType;
};

export type SetUserIDActionType = (
  payload: SetUserIDActionPayloadType,
) => SetUserIDActionReturnType;

export const setUserID: SetUserIDActionType = (payload) => ({
  type: AUTH_ACTIONS.SET_USER_ID,
  payload,
});
