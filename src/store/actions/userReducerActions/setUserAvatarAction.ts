import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { UserAvatarType } from '@store/reducers/userReducer/types';

type SetUserAvatarActionPayloadType = {
  userAvatar: UserAvatarType;
};

export type SetUserAvatarActionReturnType = {
  type: USER_REDUCER_ACTION.SET_USER_AVATAR;
  payload: SetUserAvatarActionPayloadType;
};

export type SetUserAvatarActionType = (
  payload: SetUserAvatarActionPayloadType,
) => SetUserAvatarActionReturnType;

export const setUserAvatarAction: SetUserAvatarActionType = (payload) => ({
  type: USER_REDUCER_ACTION.SET_USER_AVATAR,
  payload,
});
