import { USER_REDUCER_ACTION } from '@enums/userReducerEnum';
import { UserAvatarType } from '@store/reducers/userReducer/types';

type SetUserAvatarActionPayloadType = {
  userAvatar: UserAvatarType;
};

export type SetUserAvatarActionReturnType = {
  payload: SetUserAvatarActionPayloadType;
  type: USER_REDUCER_ACTION.SET_USER_AVATAR;
};

export type SetUserAvatarActionType = (
  payload: SetUserAvatarActionPayloadType,
) => SetUserAvatarActionReturnType;

export const setUserAvatarAction: SetUserAvatarActionType = (payload) => ({
  payload,
  type: USER_REDUCER_ACTION.SET_USER_AVATAR,
});
